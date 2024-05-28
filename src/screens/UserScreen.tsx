import React, { useState } from "react";
import { View, Text, TextInput, Button, ImageBackground } from "react-native";
import { updateUserName, updateUserPassword } from "../../db/userOperations";
import { useAuth } from "../components/AuthContext";
import { fetchUserById } from "../../db/userOperations";
import { UserData } from "../interfaces/userInterfaces";
import { userPageStyles as styles } from "../styling/UserPagesStyling";
        
const UserScreen = () => {
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string>("");

  const { user, logout } = useAuth();

  const userId = user?.userId ?? "";

  const handleNameUpdate = async () => {
    try {
      if (userId) {
        await updateUserName(userId, newName);
      }
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setError("Lösenorden matchar inte. Försök igen.");
      return;
  }
    try {
      if (userId) {
        await updateUserPassword(userId, newPassword);
      }
    } catch (error) {
      console.error("Error updating user password:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bakground1.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text>Välkommen till mina sidor {user?.name}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nytt Namn"
          value={newName}
          onChangeText={setNewName}
        />
        <Button title="Byt Namn" onPress={handleNameUpdate} />
        <TextInput
          style={styles.input}
          placeholder="Nytt Lösenord"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Bekräfta nytt lösenord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Byt Lösenord" onPress={handlePasswordUpdate} />
        <View style={styles.button}>
          <Button title="Log out" onPress={logout} />
        </View>
        </View>
    </ImageBackground>
  );
};
export default UserScreen;
