import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UserSettings from "../../components/UserSettings";
import LogoutButton from "../../components/LogoutButton";
import { GetAllUsersScreenStyling as styles } from "../../styling/GetAllUsersScreenStyling";
import Header from "../../components/Header";

const AdminScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate("GetAllUsersScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Hantera användare</Text>
      </TouchableOpacity>
      <UserSettings />
      <LogoutButton navigation={navigation} />
    </View>
  );
};

export default AdminScreen;
