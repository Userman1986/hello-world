import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './components/CHat';
import Start from './components/Start';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);



  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
