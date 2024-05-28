// userScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground } from 'react-native';
import { updateUserName, updateUserPassword } from '../../db/userOperations'; // Adjust the path to your actual file
import { useAuth } from '../components/AuthContext';
import { fetchUserById } from '../../db/userOperations';
import { UserData } from '../interfaces/userInterfaces';
import { userPageStyles as styles } from '../styling/Styling';

const UserScreen = () => {
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userData, setUserData] = useState<UserData>();

  const { user } = useAuth();

  const userId = user?.userId ?? '';

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const data = await fetchUserById(userId);
        setUserData(data);
      }
    }
    fetchUserData();
  }, []);

  const handleNameUpdate = async () => {
    try {
      if (userId) {
        await updateUserName(userId, newName);
      }
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (userId) {
      await updateUserPassword(userId, newPassword);
    }
    } catch (error) {
      console.error('Error updating user password:', error);
    }
  };

  return (
    <ImageBackground
        source={require("../../assets/images/bakground1.jpg")}
        style={styles.background}
    >
      <View style={styles.container}>
        <Text>Välkommen till mina sidor {userData?.name}</Text>
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
        <Button title="Byt Lösenord" onPress={handlePasswordUpdate} />
      </View>
    </ImageBackground>
  );
};
export default UserScreen;
