import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
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
        <View>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <TextInput value={name} onChangeText={setName} placeholder="Name" />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <Button title="Sign Up" onPress={addUser} />
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            {userCreated ? <Text>Användaren är skapad.</Text> : null}
        </View>
    );
};

export default SignupScreen;
