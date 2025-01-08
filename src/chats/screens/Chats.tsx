/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import ChatScreen from './ChatScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

const Chats = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ChatScreen /> */}
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Chats;
