import React, {useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import {navigate} from '../utils/navigationUtils';
import {KEY, ROUTES} from '../utils/constants';
import {storage} from '../utils/mmkvStorage';

const SplashScreen = () => {
  useEffect(() => {
    // Simulate a delay for the splash screen
    const timeout = setTimeout(() => {
      const USER_KEY = storage.getString(KEY.USER_KEY);
      // console.log(USER_KEY, 'key');
      if (USER_KEY) {
        navigate(ROUTES.HOME);
      } else {
        navigate(ROUTES.SIGNUP);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="green" />
      <Image
        source={require('../assets/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
