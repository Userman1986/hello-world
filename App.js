import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const Stack = createNativeStackNavigator();

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
const auth = getAuth();

// Anonymous user sign-in function
const signInAnonymouslyHandler = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing in anonymously: ", error);
  }
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {props => <Start {...props} signInAnonymouslyHandler={signInAnonymouslyHandler} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {props => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
