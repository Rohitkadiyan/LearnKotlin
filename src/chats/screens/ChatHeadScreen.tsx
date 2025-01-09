import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import UserAvtar from './UserAvtar';
import {goBack} from '../utils/navigationUtils';

interface ChatHeadProps {
  user: {
    name: string;
    status: string;
    image: string;
  };
}

const ChatHeadScreen: FC<ChatHeadProps> = ({user}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <Image
          source={require('../assets/Images/Back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* User Avatar */}
      <UserAvtar uri={user?.image} />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        {user.status && <Text style={styles.userStatus}>{user.status}</Text>}
      </View>

      {/* Options Button */}
      <TouchableOpacity style={styles.optionsButton}>
        {/* <Icon name="ellipsis-vertical" size={24} color="#fff" /> */}
        {/* <Text></Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: 'white',
    elevation: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 12,
    color: 'green',
  },
  optionsButton: {
    marginLeft: 10,
  },
});

export default ChatHeadScreen;
