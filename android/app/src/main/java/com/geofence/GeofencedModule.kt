package com.geofence

import android.Manifest
import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.util.Log
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingClient
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import java.util.UUID

class GeofencedModule(private val context:ReactApplicationContext) {
    private lateinit var fusedLocationProviderClient : FusedLocationProviderClient
    var geoFencedList : MutableList<Geofence> = mutableListOf()
    var geoFenceDtoList = mutableListOf<GeofenceDto>()
    lateinit var geofenceClient:GeofencingClient
    val _notificationResponisveness = 1 * 60 * 1000;
    val sharedPref = context.getSharedPreferences("LocationSharedPref",Context.MODE_PRIVATE)
    val _sharedPrefInitializedKey = "initialized";

//    companion object{
//        private var reactContext:ReactApplicationContext?=null
//
//        fun getReactContext():ReactApplicationContext?{
//            return reactContext
//        }
//    }

    //initialize
    fun intialize(){
//        reactContext=context
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(context)
        if (ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            throw IllegalStateException("Permission to access fine location is not granted.");
        }

        fusedLocationProviderClient.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY,CancellationTokenSource().token).addOnCompleteListener ({
            val lat = it.result.latitude
            val long = it.result.longitude

            Log.d("Current Location","$lat & $long")
            geoFenceDtoList.add(GeofenceDto(lat,long,40))
            geofenceClient = LocationServices.getGeofencingClient(context)
            subscribeToLocation()
        })
    }

    //Subscript the lat & Long
 @SuppressLint("CommitPrefEdits")
 fun subscribeToLocation()
 {
     for (geofencData in geoFenceDtoList){
            val requestId = UUID.randomUUID().toString()
         val geoFence = Geofence.Builder()
             .setRequestId(requestId)
             .setCircularRegion(
                 geofencData.lat,
                 geofencData.long,
                 geofencData.radius.toFloat()
             )
             .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER or Geofence.GEOFENCE_TRANSITION_EXIT)
             .setExpirationDuration(Geofence.NEVER_EXPIRE)
             .setNotificationResponsiveness(_notificationResponisveness)
             .setLoiteringDelay(10000)
             .build()

         geoFencedList.add(geoFence)
         sharedPref.edit()
             .putString("Location_$requestId",requestId)
             .putBoolean(_sharedPrefInitializedKey,true)
             .apply()
     }
     getGeofencingRequest()
 }
    //Create a Variable to call the broadCast
    private val geofencePendingIntent :PendingIntent by lazy {
        val intent = Intent(context,GeofenceBroadcastReceiver::class.java)
        PendingIntent.getBroadcast(context,1234,intent,PendingIntent.FLAG_MUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
    }

    //create request for geofence
    private fun getGeofencingRequest(){
        val geofenceRequest = GeofencingRequest.Builder().apply {
            setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER or GeofencingRequest.INITIAL_TRIGGER_EXIT)
            addGeofences(geoFencedList)
        }.build()

        if(ActivityCompat.checkSelfPermission(context,Manifest.permission.ACCESS_FINE_LOCATION)!=PackageManager.PERMISSION_GRANTED){
            throw IllegalStateException("Permission to access fine location is not granted")
        }

        try {
            geofenceClient.addGeofences(geofenceRequest,geofencePendingIntent).run {
                addOnSuccessListener {
                    Log.d("Geofences add successfully","Done")
                }
                addOnFailureListener { e->
                    e.printStackTrace()
                    Log.e("GeofenceModule error",e.toString())
                }
            }

        }catch(err:Exception){
            Log.e("Error when Geo fence is request",err.toString())
            throw err
        }
    }
}