import {Platform, View} from 'react-native';
import React from 'react';
// import Notification from '../../components/custom/Notification';
import Style from '../../components/custom/Style';
// import HomeFireBase from '../firebase/HomeFireBase';
// import Service from '../service/Service';
// import Testor from '../test/Testor';
import GeoFence from '../geofence/GeoFence';

const Main = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[Style.flex, {paddingTop: Platform.OS === 'android' ? 25 : 0}]}>
      {/* <Notification />
      <GeoFence /> */}
      {/* <Testor />
       */}
      {/* <HomeFireBase /> */}
      {/* <Service /> */}
      <GeoFence />
    </View>
  );
};

export default Main;
