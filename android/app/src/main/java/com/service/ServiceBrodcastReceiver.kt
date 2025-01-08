package com.service

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.work.impl.utils.ForceStopRunnable.BroadcastReceiver

@SuppressLint("RestrictedApi")
class ServiceBrodcastReceiver():BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        Log.d("BroadCAsttinng","true")
        val currentTime = intent?.getLongExtra("currentTime",0L)
        Log.d("CurrentBroadCastTime",currentTime.toString())
    }
}