import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { createUser } from '../../db/userOperations'; // adjust the path according to your project structure

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const newUser = await createUser(email, name, password);
      console.log(`Created new user: ${newUser.email} (ID: ${newUser.id})`);
      // Navigate to another screen, show a success message, etc.
    } catch (error: Error) {
      console.error(`Something went wrong: ${error.message}`);
      // Show an error message, etc.
    }
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
