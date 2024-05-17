import React, { useState } from "react";
import { Button, TextInput, View, TouchableOpacity, Text } from "react-native";
import { loginUser } from "../../db/userOperations"; 

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleLoginClick = async () => {
    try {
      const result = await loginUser(email, password); 
      if (result.success) {
        navigation.navigate("Home");
      } else {
        setErrorMessage(result.message || ""); 
      }
    } catch (error: any) { 
      if (error instanceof Error) { 
        setErrorMessage(error.message); 
      } else {
        setErrorMessage("An error occurred while logging in."); 
      }
    }
  };

  const handleCreateAccount = () => {
    // Navigate to Create Account screen
    navigation.navigate("Signup");
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLoginClick} /> 
      {errorMessage ? <Text>{errorMessage}</Text> : null} 
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
