import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../utils/navigationUtils';
import {ROUTES} from '../utils/constants';

const AddUser = () => {
  return (
    <TouchableOpacity
      style={styles.addUserWrapper}
      onPress={() => navigate(ROUTES.SEARCH_USER)}>
      <Image
        source={require('../assets/Images/AddUser.png')}
        style={styles.addUser}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  addUser: {
    height: 30,
    width: 30,
  },
  addUserWrapper: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 30,
  },
});
export default AddUser;
