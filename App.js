import {StyleSheet, LogBox } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert } from "react-native";


import Start from './components/Start';
import Chat from './components/Chat';

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
  
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(netInfo.isConnected);

  useEffect(() => {
    setIsConnected(netInfo.isConnected);
    if (netInfo.isConnected) {
      Alert.alert("Connection Lost!");
      enableNetwork(db);
    }  else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} isConnected={isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
