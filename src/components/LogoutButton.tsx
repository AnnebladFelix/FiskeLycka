import React from "react";
import { Button } from "react-native";
import { useAuth } from "./AuthContext";

const LogoutButton = ({ navigation }: { navigation: any }) => {
    const { logout } = useAuth();

    const handleLogOutClick = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }, { name: "Login" }],
        });
    };

    return <Button title="Logga ut" onPress={handleLogOutClick} />;
};

export default LogoutButton;
