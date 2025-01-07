package com.fragment

import android.widget.FrameLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ReactRoot
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

abstract class FragmentManager(private val context: ReactApplicationContext): ViewGroupManager<FrameLayout>() {
    private val COMMAND_CREATE:Int =1
    override fun getName(): String {
        return "ViewFragmentManager"
    }

    //create a view Instance
    override fun createViewInstance(context: ThemedReactContext): FrameLayout {
       return FrameLayout(context)
    }

    //Map the create command to an Integers
    override fun getCommandsMap(): MutableMap<String, Int> {
        return mutableMapOf("create" to COMMAND_CREATE)
    }

    //handle create command (Called from RN) and call createFragment method
     fun receiveCommand(root: ReactRoot,commandId:String,arg:ReadableArray){
        val reactNativeViewId = arg.getInt(0)
        val commandIdInt = Integer.parseInt(commandId)
        when (commandIdInt){
             COMMAND_CREATE->{
                 createFragment(root,reactNativeViewId)
            }else->{

            }
        }
     }

    //style 
}