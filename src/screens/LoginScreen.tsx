import React, { useEffect, useState } from "react";
import { Button, TextInput, View, TouchableOpacity, Text, StyleSheet, ImageBackground  } from "react-native";
import { loginUser } from "../../db/userOperations";
import { useAuth } from "../components/AuthContext";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (user?.userId && user.email && user.admin === true) {
      console.log("Admin är inloggad");
      navigation.navigate("AdminPage");
    }

    else {
      navigation.navigate("UserScreen");
    }
  }, [user]);

  const handleLoginClick = async () => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        const userData = { userId: result.userId, email, admin: result.admin};
        login(userData);
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
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bakground1.jpg")}
      style={styles.background}
    >
      { !user ? (
        <View style={styles.container}>
          <Text style={styles.title}>Logga in</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Lösenord"
            secureTextEntry
          />
          <Button
            title="Logga in"
            onPress={handleLoginClick}
          />
          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <TouchableOpacity
            onPress={handleCreateAccount}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountText}>Inget konto än? Skapa här.</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>Logged in as {email}</Text>
          <Button title="Log out" onPress={logout} />
        </View>
        )
    }
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
