import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils/constants';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.USER_CHAT} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
