import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
  const { name } = route.params;

  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

    // Adding initial user message
    setMessages(previousMessages => GiftedChat.append(previousMessages, {
      _id: 2,
      text: 'Hello, this is a user message.',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: name,
      },
    }));
  }, [name]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))}
        user={{ _id: 1 }}
      />
      {/* Keyboard adjustments for different devices */}
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
