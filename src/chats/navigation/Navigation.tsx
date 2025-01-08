import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackScreen from './StackScreen';
import {navigationRef} from '../utils/navigationUtils';

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
