import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {ROUTES} from '../utils/constants';
import {navigate} from '../utils/navigationUtils';

const ShowUser = () => {
  const [users] = useState<any>([
    {
      id: 1,
      name: 'Rohit',
      lastMessage: 'Hey how are you ? ',
      profilePicture: require('../assets/Images/user.png'),
    },
  ]);

  // Render each user in the list
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.userItem}
      // onPress={() => handleUserPress(item.id)}
      onPress={() => navigate(ROUTES.USER_CHAT)}>
      <Image source={item.profilePicture} style={styles.userImage} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
});

export default ShowUser;
