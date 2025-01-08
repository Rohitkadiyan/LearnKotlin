package com.service

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ForegroundServiceModule(private val context:ReactApplicationContext):ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "ForegroundServiceModule"
    }

    @ReactMethod
    fun startService (){
        Log.d("DebugUnique","Start")
        val intent = Intent(context, MyForegroundService::class.java).apply {
            putExtra("command","start")
        }
        context.startService(intent)
        Log.d("DebugUnique","StartEnd")
    }

    @ReactMethod
    fun stopService(){
        val intent = Intent(context, MyForegroundService::class.java)
        context.stopService(intent)
    }
}