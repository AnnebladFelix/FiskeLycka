// SignupScreen.tsx
import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text, ImageBackground } from "react-native";
import axios from "axios";
import { fetchUsers, addUser } from "../../db/userOperations";
import { userPageStyles as styles } from "../styling/UserPagesStyling";

interface User {
  id: string;
  name: string;
  email: string;
}

const SignupScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [userCreated, setUserCreated] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };
        getUsers();
    }, []);

    const handleAddUser = async () => {
    
        if (password !== confirmPassword) {
            setError("Lösenorden matchar inte. Försök igen.");
            return;
        }

        try {
            const user = await addUser(name, email, password);
            setError("");
            setUserCreated(true);
            setEmail("");
            setName("");
            setPassword("");
        } catch (error: any) {
            setError(error.message);
            setUserCreated(false);
        }
    };
  
  return (
    <ImageBackground
      source={require("../../assets/images/bakground1.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Skapa konto</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Namn"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Lösenord"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Bekräfta lösenord"
          secureTextEntry
        />
        <Button title="Skapa konto" onPress={handleAddUser} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {userCreated ? (
          <Text style={styles.success}>Användaren är skapad.</Text>
        ) : null}
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;
