package com.kotlinNotifications

import android.util.Log
import android.view.Gravity
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(private val context:ReactApplicationContext):ReactContextBaseJavaModule(context) {

    //Send Name of module to React Native
    override fun getName():String {
        return "ToastModule";
    }

    //Show Toast
    @ReactMethod
    fun showToast(message:String){
        Log.d("MessageFromUser",message);
        context.runOnUiQueueThread {
            val toast = Toast.makeText(context, message, Toast.LENGTH_SHORT)
            toast.setGravity(Gravity.CENTER, 0, 0)
            toast.show()
        }
    }
}