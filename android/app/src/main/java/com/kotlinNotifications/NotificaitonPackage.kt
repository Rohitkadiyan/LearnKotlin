package com.kotlinNotifications

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class NotificaitonPackage:ReactPackage {
    //Native Module
    override fun createNativeModules(context:ReactApplicationContext):List<NativeModule>{
        val modules= ArrayList<NativeModule>();
        modules.add(NotificationModule(context));
        modules.add(ToastModule(context))
        return modules;
    }

    //create View Manager
    override fun createViewManagers(context: ReactApplicationContext):List<ViewManager<*,*>>{
        return Collections.emptyList<ViewManager<*,*>>();
    }

}