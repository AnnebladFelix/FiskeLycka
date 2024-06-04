import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import UserSettings from "../../components/UserSettings";
import LogoutButton from "../../components/LogoutButton";
import { GetAllUsersScreenStyling as styles } from "../../styling/GetAllUsersScreenStyling";
import Header from "../../components/Header";

const AdminScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
            source={require("../../../assets/images/bakground1.jpg")}
            style={styles.background}
        >
      <UserSettings />
      <TouchableOpacity
        onPress={() => navigation.navigate("GetAllUsersScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>HANTERA ANVÄNDARE</Text>
      </TouchableOpacity>
      <LogoutButton navigation={navigation} />
    </ImageBackground>
  );
};

export default AdminScreen;
