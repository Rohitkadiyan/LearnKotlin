import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from './CustomText';

type button_type = {
    onPress?: () => void;
    textColor?: string;
    text: string;
};

const CustomButton: React.FC<button_type> = ({ onPress, textColor, text }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <CustomText title={text} color={textColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginVertical: 3,
        elevation: 5,
    },
});
export default CustomButton;
