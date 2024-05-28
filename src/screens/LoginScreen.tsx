import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { loginUser } from "../../db/userOperations";
import { useAuth } from "../components/AuthContext";
import { userPageStyles as styles } from "../styling/UserPagesStyling";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (user?.userId && user.email && user.admin === true) {
      navigation.navigate("AdminPage");
    } else if (user?.userId && user.email) {
      navigation.navigate("UserScreen");
    } else {
      navigation.navigate("Login");
    }
  }, [user]);

  const handleLoginClick = async () => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        const userData = {
          userId: result.userId,
          email,
          admin: result.admin,
          name: result.name,
        };
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
      {!user ? (
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
          <Button title="Logga in" onPress={handleLoginClick} />
          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <TouchableOpacity
            onPress={handleCreateAccount}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccountText}>
              Inget konto än? Skapa här.
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>Inloggad som {user.name}</Text>
          <Button title="Log out" onPress={logout} />
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
