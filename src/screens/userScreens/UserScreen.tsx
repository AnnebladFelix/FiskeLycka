import React from "react";
import { View, ImageBackground } from "react-native";
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
            <View style={styles.button}>
                <LogoutButton navigation={navigation} />
            </View>
        </ImageBackground>
    );
};

export default UserScreen;
