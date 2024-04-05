import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // Destructuring route.params
  const { name, background, id } = route.params;
  // State to manage messages
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  // Function to load cached messages from AsyncStorage//
    const loadCachedMessages = async () => {
      const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
      setLists(JSON.parse(cachedMessages)); // setLists is undefined here, it should be setMessages
    };
  
    // Function to cache messages using AsyncStorage
    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    };

    // Variable to hold unsubscribe function
    let unsubMessages;

    // Effect hook to set navigation title
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    // Effect hook to listen for changes in messages collection
    useEffect(() => {
      if (isConnected === true) {
        if (unsubMessages) unsubMessages();
        unsubMessages = null;
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
          docs.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
            })
            cacheMessages(newMessages);
            setMessages(newMessages);
          });

        } else {
          loadCachedMessages();

          return () => {
            if (unsubmessage) unsubmessage();
          };
        }

      return () => {
        if (unsubMessages) unsubMessages();
      }
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

  // Set the header title to display the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={newMessages =>
          setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
        }
        user={{ _id: 1 }}
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
