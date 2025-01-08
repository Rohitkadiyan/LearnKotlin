import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {navigate} from '../utils/navigationUtils';
import {ROUTES} from '../utils/constants';
// import {ROUTES} from '../utils/constants';

const HomeScreen = () => {
  const [users] = useState([
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Easy Chat</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
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

export default HomeScreen;
