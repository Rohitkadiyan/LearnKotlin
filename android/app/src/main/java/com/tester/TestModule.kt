package com.tester

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TestModule(context:ReactApplicationContext):ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "TestModule"
    }

    @ReactMethod
    fun sendDataWithPromiseToReactNative(promise: Promise){
        val data ="{Name:'Rohit',Class:'BCA'}"
        promise.resolve(data.toString())
    }

    @ReactMethod
    fun sendDataWithCallbackToReactNative(callback: Callback){
        val data ="{Name:'Aman',Class:'BCA'}"
        callback.invoke(data)
    }

}