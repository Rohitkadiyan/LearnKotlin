import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Style} from '../style/style';
import ChatHeadScreen from './ChatHeadScreen';
import database from '@react-native-firebase/database';

interface chatProps {
  route: {
    params: {
      data: {
        name: string;
        image: string;
      };
    };
  };
}

const ChatScreen: FC<chatProps> = ({route}) => {
  const data = route?.params?.data;
  const [messages, setMessages] = useState<any>([]);

  const onSend = useCallback((allMessages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, allMessages),
    );
  }, []);

  //get All Chats
  useEffect(() => {
    const chatHandler = async () => {
      const snapShot = await database().ref('/chatsList').once('value');
      if (snapShot.exists()) {
        console.log('user Chat', snapShot.val());
      }
    };
    chatHandler();
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
