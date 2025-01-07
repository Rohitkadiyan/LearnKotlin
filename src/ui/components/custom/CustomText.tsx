import { Text } from 'react-native';
import React from 'react';
import Style from './Style';

type text_type = {
    title: string,
    color?: string,
};
const CustomText: React.FC<text_type> = ({ title, color }) => {
    return (
        <Text style={[Style.fs14, { color: color }]}>{title}</Text>
    );
};

export default CustomText;
