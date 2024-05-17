// SignupScreen.tsx
import React, { useState, useEffect } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { fetchUsers, addUser } from "../../db/userOperations";

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

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };
        getUsers();
    }, []);

    const handleAddUser = async () => {
        try {
            const user = await addUser(name, email, password);
            console.log(`Created new user: ${user.email} (ID: ${user.id})`);
            const users = await fetchUsers();
            setUsers(users);
            setError("");
            setUserCreated(true);
            setEmail("");
            setName("");
            setPassword("");
        } catch (error: any) {
            setError(error.message);
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
            <Button title="Sign Up" onPress={handleAddUser} />
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            {userCreated ? <Text>Användaren är skapad.</Text> : null}
        </View>
    );
};

export default SignupScreen;
