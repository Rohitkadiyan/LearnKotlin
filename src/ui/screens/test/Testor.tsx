/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CustomButton from '../../components/custom/CustomButton';
import { TestModule } from '../main/RNBridge';
import { View } from 'react-native';

const Testor = () => {
    //Promise
    const getDataPromise = async () => {
        const data = await TestModule.sendDataWithPromiseToReactNative();
        console.log(data, 'Promise');
    };

    //Callback
    const getDataCallback = () => {
        TestModule.sendDataWithCallbackToReactNative((data: any) => {
            console.log(data, 'Callback');
        });
    };

    return (
        <View style={{ marginVertical: 20, flex: 1, justifyContent: 'center' }}>
            <CustomButton text="Get Data With the help of Promise" onPress={getDataPromise} />
            <CustomButton text="Get Data With the help of Promise" onPress={getDataCallback} />
        </View >
    );
};

export default Testor;
