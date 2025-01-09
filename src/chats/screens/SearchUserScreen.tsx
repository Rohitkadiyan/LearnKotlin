import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import {goBack, navigate} from '../utils/navigationUtils';
import {ROUTES} from '../utils/constants';

const SearchUserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    // Search handler
    const handleSearch = async () => {
      setLoading(true);
      try {
        const snapshot = await database()
          .ref('/users')
          .orderByChild('name')
          .startAt(searchQuery)
          .endAt(searchQuery + '\uf8ff')
          .once('value');

        if (snapshot.exists()) {
          const data = snapshot.val();
          const userList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));

          setUsers(userList);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [searchQuery]);

  // Render a single user item
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigate(ROUTES.USER_CHAT, {data: item})}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropDown} onPress={() => goBack()}>
        <Image
          source={require('../assets/Images/DropDown.png')}
          style={styles.dropDownImage}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Search by name or email"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : users?.length === 0 ? (
        <Text>No found</Text>
      ) : null}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  },
  searchButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  dropDownImage: {
    width: 35,
    height: 20,
    resizeMode: 'contain',
  },
  dropDown: {
    width: '100%',
  },
});

export default SearchUserScreen;