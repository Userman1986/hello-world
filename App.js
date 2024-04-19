import React, { useEffect, useState } from "react";
import { Alert, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";

import Start from "./components/Start";
import Chat from "./components/Chat";

// Ignore specific logs
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createNativeStackNavigator();

const App = () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC1Bk-GfGYoQZWFtNcQcHZN5-HzS9in-Wc",
    authDomain: "chatapp-2842c.firebaseapp.com",
    projectId: "chatapp-2842c",
    storageBucket: "chatapp-2842c.appspot.com",
    messagingSenderId: "844058231259",
    appId: "1:844058231259:web:616ed36924d11a64e8e7fe",
    measurementId: "G-16LQSGFVSZ"
  };

  // Initialize Firebase app, firestore, and storage
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Check if Firebase Authentication has already been initialized
  const [authInitialized, setAuthInitialized] = useState(false);
  let auth;
  if (!authInitialized) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    setAuthInitialized(true);
  } else {
    auth = getAuth();
  }

  // Get network connection status
  const netInfo = useNetInfo();

  // Handle network connection changes
  useEffect(() => {
    if (netInfo.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else {
      enableNetwork(db);
    }
  }, [netInfo.isConnected, db]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={netInfo.isConnected}
              storage={storage}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
