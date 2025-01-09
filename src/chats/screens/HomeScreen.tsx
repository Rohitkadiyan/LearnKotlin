import {View, StyleSheet} from 'react-native';
import React from 'react';
import Header from './Header';
import ShowUser from './ShowUser';
import AddUser from './AddUser';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ShowUser />
      <AddUser />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
