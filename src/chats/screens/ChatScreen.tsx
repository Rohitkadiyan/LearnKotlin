import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Style} from '../style/style';
// import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}: any) => {
  console.log(route, 'routeId');
  //   const {chatRoomId} = route.params; // Unique chat room ID
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hey How are you ? ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../assets/Images/user.png'),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((allMessages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, allMessages),
    );
  }, []);

  return (
    <View style={Style.flex}>
      <GiftedChat
        messages={messages}
        onSend={allMessages => onSend(allMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;
