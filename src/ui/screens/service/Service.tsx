import {View, Text} from 'react-native';
import React from 'react';
import CustomButton from '../../components/custom/CustomButton';
import {ServiceModules} from '../main/RNBridge';

const Service = () => {
  //foreground
  const startService = () => {
    console.log('start');
    ServiceModules.startService();
  };

  const stopService = () => {
    console.log('stop');
    // ServiceModules.stopService();
  };

  //background start
  const startBackgroundService = () => {
    ServiceModules.startBackService();
  };

  //background stop
  // const stopBackgroundService = () => {
  //   ServiceModules.stopBackService();
  // };

  return (
    <View>
      <Text>Service</Text>
      <CustomButton text="Start Service" onPress={startService} />
      <CustomButton text="Stop Service" onPress={stopService} />
      <CustomButton
        text="Start BackGround Service"
        onPress={startBackgroundService}
      />
      {/* <CustomButton
        text="Stop BackGround Service"
        onPress={stopBackgroundService}
      /> */}
    </View>
  );
};

export default Service;
