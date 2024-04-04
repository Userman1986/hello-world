import { useState } from 'react';
import { ImageBackground,StyleSheet, View, Text, Button, TextInput } from 'react-native';

const Chat = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
     <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    
      <Text>Hello Screen1!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
      />
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate('Start', { name: name })}
      />
       </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  }
});

export default Chat;
