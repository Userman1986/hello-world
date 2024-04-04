import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
  const { name, backgroundColor } = route.params; // Extracting backgroundColor from route params

  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  // useEffect to initialize chat messages
  useEffect(() => {
    // Adding initial system message
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: 1,
        text: `Welcome, ${name}! You've entered the chat.`,
        createdAt: new Date(),
        system: true,
      })
    );

    // Adding initial user message
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: 2,
        text: 'Hello, this is a user message.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: name,
        },
      })
    );
  }, [name]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}> {/* Set background color */}
      <GiftedChat
        messages={messages}
        onSend={newMessages =>
          setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
        }
        user={{ _id: 1 }}
        renderUsernameOnMessage // Display username on messages
      />
      {/* Keyboard adjustments for different devices */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
