/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KEY, ROUTES} from '../utils/constants';
import {navigate} from '../utils/navigationUtils';
import database from '@react-native-firebase/database';
import {storage} from '../utils/mmkvStorage';

const ShowUser = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  //show connected user
  useEffect(() => {
    const getConnectedUser = async () => {
      const JSON_Data = storage.getString(KEY.USER_DATA) as string;
      const user_data = JSON.parse(JSON_Data);

      database()
        .ref(`/chatsList/${user_data.id}`)
        .once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
          setUsers((prev: any[]) => {
            const newUsers = snapshot.val()
              ? Object.values(snapshot.val())
              : [];
            const combinedUsers = [...prev, ...newUsers];
            const uniqueUsers = combinedUsers.filter(
              (user, index, self) =>
                index === self.findIndex(u => u.id === user.id),
            );
            return uniqueUsers;
          });
          setLoading(false);
        });
    };
    getConnectedUser();
  }, []);

  // Render each user in the list
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      key={item?.id}
      style={styles.userItem}
      // onPress={() => handleUserPress(item.id)}
      onPress={() => navigate(ROUTES.USER_CHAT)}>
      <Image source={{uri: item?.image}} style={styles.userImage} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item?.name}</Text>
        <Text style={styles.userEmail}>{item?.lastMsg}</Text>
      </View>
    </TouchableOpacity>
  );
  console.log(users, 'users');
  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} size={40} color={'lightgreen'} />
        </View>
      ) : users?.length <= 0 ? (
        <View style={{flex: 1}}>
          <Image
            source={require('../assets/Images/EmptyChat.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
        />
      )}
    </>
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
