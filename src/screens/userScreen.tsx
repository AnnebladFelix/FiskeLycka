// userScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateUserName, updateUserPassword } from '../../db/userOperations'; // Adjust the path to your actual file

const UserScreen = () => {
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNameUpdate = async () => {
    try {
      await updateUserName(newName);
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await updateUserPassword(newPassword);
    } catch (error) {
      console.error('Error updating user password:', error);
    }
  };

  return (
    <View>
      <Text>Användare {}</Text>
      <TextInput
        placeholder="New Name"
        value={newName}
        onChangeText={setNewName}
      />
      <Button title="Update Name" onPress={handleNameUpdate} />

      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Update Password" onPress={handlePasswordUpdate} />
    </View>
  );
};

export default UserScreen;
