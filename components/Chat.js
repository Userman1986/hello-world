import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, id } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "desc")), (snapshot) => {
      let newMessages = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          _id: doc.id, // Added _id field
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: 1,
        text: `Welcome, ${name}! You've entered the chat.`,
        createdAt: new Date(),
        system: true,
      })
    );
  }, [name]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: id,
          name: name,
        }}
        renderUsernameOnMessage
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
