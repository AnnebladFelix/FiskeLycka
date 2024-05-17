import React, { useState } from "react";
import { Button, TextInput, View, TouchableOpacity, Text } from "react-native";
import { loginUser } from "../../db/userOperations";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginUser(email, password);
    navigation.navigate("Home");
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
