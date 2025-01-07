import { View } from 'react-native';
import React from 'react';
// import Notification from '../../components/custom/Notification';
import Style from '../../components/custom/Style';
import Testor from '../test/Testor';
// import GeoFence from '../geofence/GeoFence';

const Main = () => {
    return (
        <View style={[Style.flex]}>
            {/* <Notification />
            <GeoFence /> */}
            <Testor />
        </View>
    );
};

export default Main;
