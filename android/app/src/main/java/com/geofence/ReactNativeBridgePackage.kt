package com.geofence

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class ReactNativeBridgePackage:ReactPackage {
    //Create a Native Module
    override fun createNativeModules(context:ReactApplicationContext): List<NativeModule> {
        val modules = ArrayList<NativeModule>();
        modules.add(ReactNativeBridgeModule(context));
        return  modules;
    }
    //Create a ViewManger
    override fun createViewManagers(context: ReactApplicationContext):List<ViewManager<*,*>>{
        return Collections.emptyList<ViewManager<*,*>>()
    }
}