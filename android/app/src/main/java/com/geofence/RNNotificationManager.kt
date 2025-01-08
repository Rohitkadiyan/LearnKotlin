package com.geofence

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.learnkotlin.MainActivity
import com.learnkotlin.R

class RNNotificationManager(val context:Context) {
    //create Channel
    fun createChannel (){
        Log.d("Notfication Channel","true")
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
                try {
                    val CHANNEL_ID = "Geofence_Channel"
                    val name: CharSequence = "Geofence Alerts"
                    val description = "Notification for geofencing events"
                    val importance: Int = NotificationManager.IMPORTANCE_HIGH
                    val channel = NotificationChannel(CHANNEL_ID, name, importance)
                    channel.description = description

                    val notificationManager = context.getSystemService(NotificationManager::class.java)
                    if (notificationManager != null) {
                        notificationManager.createNotificationChannel(channel)
                        Log.d("Notification Channel", "Channel created successfully")
                    } else {
                        Log.e("Notification Channel", "NotificationManager is null")
                    }
                } catch (e: Exception) {
                    Log.e("Notification Channel", "Error creating channel: ${e.message}")
                }
            }else {
                Log.d("Notification Channel", "SDK version below Oreo, no channel needed")
            }
    }

    //send Notification
    fun send(isEnter:Boolean){
        val message=if(isEnter){
            "You have marked you attendance"
        } else {
            "You are logged out"
        }
        Log.d("NotficationManger",message)

        val builder = NotificationCompat.Builder(context,"Geofence_Channel")
            .setContentTitle("Geofence Alert")
            .setSmallIcon(R.drawable.bolt)
            .setContentText(message)
            .setAutoCancel(true)
//            .setPriority(NotificationCompat.PRIORITY_HIGH)
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(1234,builder.build())
    }

}