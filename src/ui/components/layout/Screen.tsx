import { View } from 'react-native';
import React, { ReactNode } from 'react';
import Style from '../custom/Style';

type screen_type = {
    children: ReactNode,
    center?: boolean,
};
const Screen: React.FC<screen_type> = ({ children, center }) => {
    return (
        <View style={[center ? Style.container : Style.flex]}>
            {children}
        </View>
    );
};



export default Screen;
