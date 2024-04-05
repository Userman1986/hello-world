import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, db, isConnected }) => {
  const { name, backgroundColor, id } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#757083"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('cachedMessages');
      if (cachedMessages !== null) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.error("Error loading cached messages:", error);
    }
  }

  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('cachedMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Error caching messages:", error);
    }
  }

  useEffect(() => {
    if (isConnected) {
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
        cacheMessages(newMessages); // Cache messages when fetched
      });
      return () => unsubscribe();
    } else {
      loadCachedMessages(); // Load cached messages when offline
    }
  }, [isConnected]);

  const renderInputToolbar = (props) => {
    return isConnected ? <InputToolbar {...props} /> : null;
  };

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
        renderBubble={renderBubble}
        onSend={onSend}
        user={{
          _id: id,
          name: name,
        }}
        renderUsernameOnMessage
        renderInputToolbar={renderInputToolbar} // Rendering InputToolbar based on connection status
      />
    </View>
  );
};

// Styles for the Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
