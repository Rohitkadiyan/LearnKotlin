import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Style} from '../style/style';
import ChatHeadScreen from './ChatHeadScreen';
import {storage} from '../utils/mmkvStorage';
import {KEY} from '../utils/constants';
import database from '@react-native-firebase/database';

const ChatScreen = ({route}: any) => {
  console.log(route?.params?.data?.image, 'routeId');
  const data = route?.params?.data ?? {};
  //   const {chatRoomId} = route.params; // Unique chat room ID
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    console.log('userEfect');
    const JSON_Data = storage.getString(KEY.USER_DATA) as string;
    const user_data = JSON.parse(JSON_Data);
    let myData = {
      name: user_data?.name ?? '',
      img: user_data?.image ?? '',
      email: user_data?.email ?? '',
      about: user_data?.about ?? '',
      lastMsg: '',
    };

    //Create a RealationShip
    database()
      .ref(`/chats/${data?.id}/${user_data?.id}`)
      .update(myData)
      .then(() => console.log('Data updated.'));
  }, [data?.id]);

  const onSend = useCallback((allMessages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, allMessages),
    );
  }, []);

  return (
    <View style={[Style.flex]}>
      <ChatHeadScreen
        user={{name: data?.name, status: 'Online', image: data?.image}}
      />
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
