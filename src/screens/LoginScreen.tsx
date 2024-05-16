import React, { useState } from 'react';
import { Button, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { verifyUser } from '../../db/userOperations';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await verifyUser(username, password);
    } catch (error: any) {
      console.error(`Login failed: ${error.message}`);
    }
  };

  const handleCreateAccount = () => {
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
      <Button 
        title="Login" 
        onPress={handleLogin} 
      />
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
