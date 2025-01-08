package com.geofence

import android.app.ActivityManager
import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class AppStateModule(context:ReactApplicationContext):ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "AppStateModule"
    }

    companion object{
        //state check
        fun isAppOnForeground(context: Context): Boolean {
            val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            val appProcesses = activityManager.runningAppProcesses ?: return false
            val packageName: String = context.packageName
            for (appProcess in appProcesses) {
                if (appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName == packageName
                ) {
                    return true
                }
            }
            return false
        }
    }
}