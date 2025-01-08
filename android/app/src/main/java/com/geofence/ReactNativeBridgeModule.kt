package com.geofence

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ReactNativeBridgeModule(private val context:ReactApplicationContext):ReactContextBaseJavaModule(context) {
    val geofence = GeofencedModule(context!!)

    //getName of Module
    override fun getName(): String {
        return "ReactNativeBridge";
    }

    @ReactMethod
    fun geofenceInitilize(){
        Log.d("GeofencinnggStart","true")
        geofence.intialize()
    }
}