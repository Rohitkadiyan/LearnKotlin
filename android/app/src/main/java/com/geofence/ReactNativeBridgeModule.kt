package com.geofence

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class ReactNativeBridgeModule(private val context:ReactApplicationContext):ReactContextBaseJavaModule(context) {

    //getName of Module
    override fun getName(): String {
        return "ReactNativeBridge";
    }

}