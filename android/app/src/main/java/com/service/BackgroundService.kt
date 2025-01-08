package com.service

import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.learnkotlin.R

class BackgroundService:Service() {
    //when Service Start
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("BackgroundService","Service Start")
        Thread{
            for (i in 0..10){
                Thread.sleep(1000)
                Log.d("Background Service","Background work in progress $i")
            }
            stopSelf()
        }.start()
        sendNotify("Background Service Running","Performing background tasks..","START")
        return START_STICKY
    }

    //when Service Stop
    override fun onDestroy() {
        super.onDestroy()
        Log.d("BackgroundService","Service Stopped");
        sendNotify("Background Task","Completed" ,"DESTROY")
    }
    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    //send notification
    private fun sendNotify (message:String,Title:String ,type:String){
        Log.d("Notification Type",type)
         val notification = NotificationCompat.Builder(this,"Geofence_Channel")
            .setContentTitle(Title)
            .setContentText(message)
            .setSmallIcon(R.drawable.bolt)
            .build()
        if(type=="START"){
            startForeground(1, notification)
        }else{
            val notificationManager = applicationContext.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.notify(2, notification)
        }
    }
}