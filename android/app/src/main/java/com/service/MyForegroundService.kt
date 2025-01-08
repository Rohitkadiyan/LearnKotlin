package com.service

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.learnkotlin.MainActivity
import com.learnkotlin.R
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class MyForegroundService:Service() {
    private val handler = Handler(Looper.getMainLooper())
    companion object{
        private const val CHANNEL_Id = "abed133"
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private val taskRunnable = object :Runnable{
        override fun run() {
            Log.d("MyForegroundSerive","Task is running in the foreground..")
            val currentTime = System.currentTimeMillis()
            val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
            val formattedTime = dateFormat.format(Date(currentTime))
            Log.d("MyForegroundService", "Current Time: $formattedTime")
            sendTimeToReactNative(formattedTime)
            //scheduler
            handler.postDelayed(this,60000)
        }
    }

    private fun sendTimeToReactNative(currentTime:String){
        val intent = Intent("action")
        intent.putExtra("currentTime",currentTime)
        Log.d("intent uniquer",intent.toString())
        sendBroadcast(intent)
    }

    //when start service
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        createNotificationChannel()
        notificationSend("Service is running in the foreground")
        handler.post(taskRunnable)
        return  START_NOT_STICKY
    }

    //send notification
   private fun notificationSend(message:String){
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(this,0,notificationIntent,PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
        val notification = NotificationCompat.Builder(this, CHANNEL_Id)
            .setContentTitle("Foreground Service")
            .setContentText(message)
            .setSmallIcon(R.drawable.bolt)
            .setContentIntent(pendingIntent)
            .build()
        startForeground(1,notification)
    }
    //notification Channel
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel(){
        val serviceChannel = NotificationChannel(
            CHANNEL_Id,
            "Foreground Service Channel",
            NotificationManager.IMPORTANCE_DEFAULT
        )
        val manager = applicationContext.getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel((serviceChannel))
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}