package com.kotlinNotifications

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.graphics.Color
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.learnkotlin.R


class NotificationModule:ReactContextBaseJavaModule {
    //Variables
    var loading:Boolean= false
    lateinit var notificationManager:NotificationManager
    lateinit var notificationChannel:NotificationChannel
    val channelId:String = "abed4hjfjdkf"
    lateinit var builder:Notification.Builder
    lateinit var createContext: ReactApplicationContext

    //Constructor
    constructor(context:ReactApplicationContext):super(context){
        this.loading=true
        this.createContext=context
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            notificationChannel = NotificationChannel(channelId,"My Notification",NotificationManager.IMPORTANCE_HIGH)

            //configure the notification channel
            notificationChannel.apply {
                description="This is a notification channel description"
                enableLights(true)
                lightColor=Color.RED
                enableVibration(true)
            }

            //register the channel with system
            notificationManager = createContext.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel((notificationChannel))

        }
    }

    //get Name of custom module for React Native Bridge
    override fun getName(): String {
        return "NotificationModule";
    }

    @ReactMethod
    fun TriggerNotification(contentTitle:String,contentText:String ,desc:String){

        if(this.loading){
            val notificationBuilder:NotificationCompat.Builder= NotificationCompat.Builder(createContext,channelId)
            notificationBuilder.apply {
                setAutoCancel(true)
                System.currentTimeMillis()
                try {
                    setSmallIcon(R.drawable.bolt)
                } catch (e: Exception) {
                    setSmallIcon(android.R.drawable.ic_notification_clear_all)
                }
                setTicker("Hearty365")
                setContentTitle(contentTitle)
                setContentText(contentText)
                setContentInfo("Info")
                setStyle(NotificationCompat.BigTextStyle().bigText(desc))
                setPriority(NotificationCompat.PRIORITY_DEFAULT)
            }

            notificationManager.notify(1234,notificationBuilder.build())
        }
    }

    @ReactMethod
    fun showProgressBar(title:String ,text:String ,completeText:String){
        if(this.loading){
            val progressBuilder:NotificationCompat.Builder = NotificationCompat.Builder(createContext,channelId).apply {
                setContentTitle(title)
                setContentText(text)
                try {
                    setSmallIcon(R.drawable.bolt)
                } catch (e: Exception) {
                    setSmallIcon(android.R.drawable.ic_notification_clear_all)
                }
                setPriority(NotificationCompat.PRIORITY_DEFAULT)
            }
            val PROGRESS_MAX = 100
            var PROGRESS_CURRENT = 0
            Thread {
                while (PROGRESS_CURRENT <= PROGRESS_MAX) {
                    progressBuilder.setProgress(PROGRESS_MAX, PROGRESS_CURRENT, false)
                    notificationManager.notify(1234,progressBuilder.build());

                    try {
                        Thread.sleep(500)
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                    }

                }

                // Step 4: Update Notification When Complete
                progressBuilder.apply {
                    setContentText(completeText)
                    setProgress(0, 0, false) // Remove the progress bar
                    notificationManager.notify(1234,progressBuilder.build());
                }

            }.start()
        }
    }


}