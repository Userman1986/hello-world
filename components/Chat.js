
import { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
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
        renderBubble={renderBubble}
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



// Styles for the Chat component
const styles = StyleSheet.create({
container: {
flex: 1,
},
});

export default Chat;
