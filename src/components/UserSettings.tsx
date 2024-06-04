import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { updateUserName, updateUserPassword } from "../../db/userOperations";
import { useAuth } from "../components/AuthContext";
import { userPageStyles as styles } from "../styling/UserPagesStyling";
import Header from "./Header";

const UserSettings = () => {
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
    const [nameChanged, setNameChanged] = useState<boolean>(false);

    const { user } = useAuth();

    const userId = user?.userId ?? "";

    const handleNameUpdate = async () => {
        try {
            if (userId) {
                await updateUserName(userId, newName);
                setNameChanged(true);
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
                setPasswordChanged(true);
            }
        } catch (error) {
            console.error("Error updating user password:", error);
        }
    };

    return (
        <View>
            <Header />
            <View style={styles.container}>
                <Text>Välkommen till mina sidor {user?.name}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nytt Namn"
                    value={newName}
                    onChangeText={setNewName}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNameUpdate}
                >
                    <Text style={styles.buttonText}>ÄNDRA NAMN</Text>
                </TouchableOpacity>
                {nameChanged ? (
                    <Text style={styles.success}>
                        Användarnamnet är ändrat.
                    </Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder="Nytt Lösenord"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bekräfta Nytt Lösenord"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePasswordUpdate}
                >
                    <Text style={styles.buttonText}>ÄNDRA LÖSENORD</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {passwordChanged ? (
                    <Text style={styles.success}>Lösenordet ändrat.</Text>
                ) : null}
            </View>
        </View>
    );
};

export default UserSettings;
