import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

const SignupScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [userCreated, setUserCreated] = useState<boolean>(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>(
                "https://fiskelycka.netlify.app/api/users",
                { timeout: 10000 }
            );
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addUser = async () => {
        try {
            const response = await axios.post<User>(
                "https://fiskelycka.netlify.app/api/users",
                { name, email, password }
            );
            console.log(
                `Created new user: ${response.data.email} (ID: ${response.data.id})`
            );
            fetchUsers();
            setError("");
            setUserCreated(true);
            setEmail("");
            setName("");
            setPassword("");
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                setError("Error creating user");
            }
            setUserCreated(false);
        }
    };

    return (
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
            <Button title="Skapa konto" onPress={addUser} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {userCreated ? <Text style={styles.success}>Användaren är skapad.</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        marginTop:40,
    },
    input: {
        width: '100%',
        height: 40,
        padding: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    success: {
        color: 'green',
        marginTop: 10,
    },
});

export default SignupScreen;
