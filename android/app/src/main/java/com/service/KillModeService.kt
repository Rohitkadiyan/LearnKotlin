package com.service

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

class KillModeService:Service() {
    override fun onCreate() {
        super.onCreate()
        Log.d("App run in kill mode","true")
        startForegroundServiceWithNotification()
    }

    private fun startForegroundServiceWithNotification(){

    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }
}