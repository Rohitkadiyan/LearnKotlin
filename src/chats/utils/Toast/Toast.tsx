/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, FC} from 'react';
import {Text, StyleSheet, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
interface ToastType {
  visible: boolean;
  message: string;
  // onDismiss: () => void;
  type: string;
}

const Toast: FC<ToastType> = ({visible, message, type}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const hideToast = () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // onDismiss && onDismiss();
      });
    };
    if (visible) {
      // Show Toast
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [opacity, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          backgroundColor: type === 'error' ? 'red' : 'green',
        },
      ]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Toast;
