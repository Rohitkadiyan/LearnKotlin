package com.geofence

import android.app.ActivityManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.HeadlessJsTaskService
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofenceStatusCodes
import com.google.android.gms.location.GeofencingEvent
import okhttp3.internal.immutableListOf

class GeofenceBroadcastReceiver:BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        Log.d("broadcastfirst","true");
        val geofenceEvent = intent?.let {GeofencingEvent.fromIntent(it)}
        if(context == null || geofenceEvent == null){
            Log.e("Geofencing ","true")
            return
        }
        if(geofenceEvent.hasError()){
            val errorMessage = GeofenceStatusCodes.getStatusCodeString(geofenceEvent.errorCode)
            return
        }

        //get The transitionType
        val geofenceTransition = geofenceEvent.geofenceTransition
        if(geofenceTransition == Geofence.GEOFENCE_TRANSITION_DWELL){
            return //Not interested in DWELL
        }

        //Data form Geofence event occur
        val triggerLocation = geofenceEvent.triggeringLocation
        val lat = triggerLocation?.latitude
        val long = triggerLocation?.longitude
        val eventType = if(geofenceTransition==Geofence.GEOFENCE_TRANSITION_ENTER) {"geofenceEnter"} else{"geofenceExit"}

        if(lat!=null && long !=null){
            val geofenceRecord = GeofenceRecord(lat,long,eventType)
            Log.d("Geofenceinng Record",geofenceRecord.toString())
            saveData(geofenceRecord ,context)
        }

        //Channel create for notification
        val notificationManager = RNNotificationManager(context)
        notificationManager.createChannel()
        notificationManager.send(geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER)

    }

    //save Data
//    @RequiresApi(Build.VERSION_CODES.O)
    private  fun saveData(record:GeofenceRecord, context: Context){
        Log.d("record Record",record.toString())
//        val reactContext:ReactApplicationContext? = GeofencedModule.getReactContext()
//        if(reactContext==null){
//            Log.e("React Context is Null","true")
//        }
        if(checkAppState(context)){
            Log.d("Foreground & Background app running.." ,"true")
//            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
//                ?.emit("record",record)
            val headlessJSIntent = Intent(context, HeadlessJsTask::class.java)
            headlessJSIntent.putExtra("event",record.toString())
            context.startService(headlessJSIntent)
            HeadlessJsTaskService.acquireWakeLockNow(context)
        }else{
            Log.d("app run in kill mode","true")
        }
    }

    //check App State for foreground & Background
    private fun checkAppState(context: Context): Boolean {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            val interestImportance = immutableListOf<Int>(ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND,ActivityManager.RunningAppProcessInfo.IMPORTANCE_CACHED)
            val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            val appProcess = activityManager.runningAppProcesses?:return false
            val packageName:String =context.packageName
            for (appProcess in appProcess){
                if(appProcess.importance in interestImportance &&
                    appProcess.processName== packageName){
                    return true
                }
            }
        }
        return false
    }

}

data class GeofenceRecord(val lat:Double,val long:Double,val eventType:String)