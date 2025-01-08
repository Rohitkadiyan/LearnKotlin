import {View, Text, NativeModules} from 'react-native';
import React from 'react';
import CustomButton from '../../components/custom/CustomButton';

const {ForegroundServiceModule} = NativeModules;
const Service = () => {
  const startService = () => {
    console.log('start');
    // ForegroundServiceModule.startService();
  };
  const stopService = () => {
    console.log('stop');
    // ForegroundServiceModule.stopService();
  };
  return (
    <View>
      <Text>Service</Text>
      <CustomButton text="Start Service" onPress={startService} />
      <CustomButton text="Stop Service" onPress={stopService} />
    </View>
  );
};

export default Service;
