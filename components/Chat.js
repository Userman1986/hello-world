import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <Text>Welcome to chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;
