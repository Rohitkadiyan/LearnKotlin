import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils/constants';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import SearchUserScreen from '../screens/SearchUserScreen';

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTES.SPLASH}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.USER_CHAT} component={ChatScreen} />
      <Stack.Screen name={ROUTES.SEARCH_USER} component={SearchUserScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
