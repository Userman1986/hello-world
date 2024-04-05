import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Chat = ({ route, db }) => {
  const { userId, name, backgroundColor } = route.params;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "desc")), (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          ...data,
          _id: doc.id,
          createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date object
        });
      });
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, [db]);

  const onSend = (newMessages) => {
    newMessages.forEach((message) => {
      collection(db, "messages").add({
        ...message,
        createdAt: new Date(), // Use current date as createdAt
      });
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userId,
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
