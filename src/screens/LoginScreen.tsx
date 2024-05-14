import React, { useState } from 'react';
import { Button, TextInput, View, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleCreateAccount = () => {
    // Navigate to Create Account screen
    navigation.navigate('CreateAccount');
  };

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
