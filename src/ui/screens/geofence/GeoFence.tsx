import {PermissionsAndroid, Text} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../../components/layout/Screen';
import {ReactNativeBridge} from '../main/RNBridge';

const requestPermission = async () => {
  const hasLocationPermission = await PermissionsAndroid.check(
    'android.permission.ACCESS_FINE_LOCATION',
  );
  const backgroundPermission = await PermissionsAndroid.check(
    'android.permission.ACCESS_BACKGROUND_LOCATION',
  );
  if (hasLocationPermission && backgroundPermission) {
    return true;
  }

  //fine location
  const granted = await PermissionsAndroid.request(
    'android.permission.ACCESS_FINE_LOCATION',
    {
      message:
        'Permission to fine location is mandatory in order to work this application properly.',
      title: 'Oh (',
      buttonPositive: 'Ok',
    },
  );
  const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
  if (!isGranted) {
    return false;
  }

  //Background Location
  const isBackGranted = await PermissionsAndroid.request(
    'android.permission.ACCESS_BACKGROUND_LOCATION',
    {
      message:
        'Permission to fine location is mandatory in order to work this application properly.',
      title: 'oh ( ',
      buttonPositive: 'Ok',
    },
  );

  const isBackgroundLocation =
    isBackGranted === PermissionsAndroid.RESULTS.GRANTED;
  if (!isBackgroundLocation) {
    return false;
  }

  const notificationRequestStatus = await PermissionsAndroid.request(
    'android.permission.POST_NOTIFICATIONS',
    {
      message:
        'Permission to fine location is mandatory in order to work this application properly.',
      title: 'Ohhh :(',
      buttonPositive: 'OK',
    },
  );
  return notificationRequestStatus === PermissionsAndroid.RESULTS.GRANTED;
};
const GeoFence = () => {
  useEffect(() => {
    const checkPermission = async () => {
      const res = await requestPermission();
      console.log(res, 'res');
      if (res) {
        ReactNativeBridge.geofenceInitilize();
      }
    };
    checkPermission();
  }, []);

  //get Data from Geofence Native Event
  // useEffect(() => {
  //   const eventEmmitter = new NativeEventEmitter(ReactNativeBridge);
  //   const subscription = eventEmmitter.addListener('record', event => {
  //     console.log(event, 'saved Event');
  //     return () => subscription.remove();
  //   });
  // }, []);

  return (
    <Screen center={true}>
      <Text>GeoFence</Text>
    </Screen>
  );
};

export default GeoFence;
