import React from "react";
import { ImageBackground } from "react-native";
import { userPageStyles as styles } from "../../styling/UserPagesStyling";
import UserSettings from "../../components/UserSettings";
import LogoutButton from "../../components/LogoutButton";

const UserScreen = ({ navigation }: { navigation: any }) => {
    return (
        <ImageBackground
            source={require("../../../assets/images/bakground1.jpg")}
            style={styles.background}
        >
            <UserSettings />
            <LogoutButton navigation={navigation} />
        </ImageBackground>
    );
};

export default UserScreen;
