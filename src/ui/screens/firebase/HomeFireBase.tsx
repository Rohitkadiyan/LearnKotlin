/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView, Platform} from 'react-native';
import React from 'react';

const HomeFireBase = () => {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
      <Text>HomeFireBase</Text>
    </SafeAreaView>
  );
};

export default HomeFireBase;
