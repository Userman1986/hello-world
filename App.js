import React from 'react';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ignore specific logs
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC1Bk-GfGYoQZWFtNcQcHZN5-HzS9in-Wc",
    authDomain: "chatapp-2842c.firebaseapp.com",
    projectId: "chatapp-2842c",
    storageBucket: "chatapp-2842c.appspot.com",
    messagingSenderId: "844058231259",
    appId: "1:844058231259:web:616ed36924d11a64e8e7fe"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
