import React, { useState } from 'react';
import { Button, TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleCreateAccount = () => {
    // Navigate to Create Account screen
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Lösenord"
        secureTextEntry
      />
      <Button title="Logga in" onPress={handleLogin} />
      <TouchableOpacity onPress={handleCreateAccount} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Inget konto än? Skapa här.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop:40,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  createAccountButton: {
    marginTop: 16,
  },
  createAccountText: {
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
