import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { createUser } from "../../db/userOperations";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUser(email, name, password);
    } catch (error: any) {
      console.error(`Something went wrong: ${error.message}`);
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
      <Button 
        title="Sign Up" 
        onPress={handleSignup} 
      />
    </View>
  );
};

export default SignupScreen;
