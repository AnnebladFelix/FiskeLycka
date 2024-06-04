// SignupScreen.tsx
import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text, ImageBackground } from "react-native";
import { fetchUsers, addUser } from "../../../db/userOperations";
import { userPageStyles as styles } from "../../styling/UserPagesStyling";
import { UserData } from "../../interfaces/userInterfaces";
import Header from "../../components/Header";

interface User {
    id: string;
    name: string;
    email: string;
}

const SignupScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState<string>("");
    const [userCreated, setUserCreated] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };
        getUsers();
    }, []);

    const handleAddUser = async () => {
        if (password !== confirmPassword) {
            setError("Lösenorden matchar inte. Försök igen.");
            return;
        }

        try {
            await addUser(name, email, password);
            setError("");
            setUserCreated(true);
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                navigation.navigate("Login");
            }, 2000);
        } catch (error: any) {
            setError(error.message);
            setUserCreated(false);
        }
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/bakground1.jpg")}
            style={styles.background}
        >
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Skapa konto</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Namn"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Lösenord"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Bekräfta lösenord"
                    secureTextEntry
                />
                <Button title="Skapa konto" onPress={handleAddUser} />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {userCreated ? (
                    <Text style={styles.success}>
                        Användaren är skapad. Du blir nu omdirigerad till Logga
                        in.
                    </Text>
                ) : null}
            </View>
        </ImageBackground>
    );
};

export default SignupScreen;
