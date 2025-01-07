package com.tester

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class TestPackage:ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
        return listOf(TestModule(context))
    }

    override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<View, ReactShadowNode<*>>> {
       return Collections.emptyList()
    }
}