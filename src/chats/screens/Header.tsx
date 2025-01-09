/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {storage} from '../utils/mmkvStorage';
import {KEY} from '../utils/constants';

const Header = () => {
  const user_Data = storage.getString(KEY.USER_DATA) as string;
  const data = JSON.parse(user_Data);
  console.log(data.image, 'data');
  return (
    <View style={styles.header}>
      <View
        style={[{width: '70%', flexDirection: 'row', alignItems: 'center'}]}>
        <Image
          source={require('../assets/logo/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Easy Chat</Text>
      </View>
      <View
        style={[
          {
            width: '27%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <Image
          source={require('../assets/Images/notification.png')}
          style={styles.notification}
        />
        <Image
          source={{
            uri: data?.image,
          }}
          style={[styles.notification, {borderWidth: 1, borderColor: 'white'}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  notification: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Header;
