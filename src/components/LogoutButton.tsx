import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useAuth } from "./AuthContext";
import { userPageStyles as styles } from "../styling/UserPagesStyling";

const LogoutButton = ({ navigation }: { navigation: any }) => {
    const { logout } = useAuth();

    const handleLogOutClick = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }, { name: "Login" }],
        });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogOutClick}>
            <Text style={styles.buttonText}>LOGGA UT</Text>
        </TouchableOpacity>
    )
};

export default LogoutButton;
