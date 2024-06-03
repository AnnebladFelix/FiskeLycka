import React, { useEffect, useState } from "react";
import { UserData } from "../../interfaces/userInterfaces";
import { View, Text } from "react-native";
import { fetchUsers } from "../../../db/userOperations";
import UserSettings from "../../components/UserSettings";
import LogoutButton from "../../components/LogoutButton";

const AdminPage = ({ navigation }: { navigation: any }) => {
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetchUsers();

            const userData: UserData[] = allUsers.map((user) => ({
                ...user,
                userId: user.userId,
                posts: user.posts || [],
            }));

            setUsers(userData);
        };

        getUsers();
    }, []);

    return (
        <View>
            <Text> Du är nu inne på Admin sidan</Text>
            {users.map((user, index) => (
                <View key={index}>
                    <Text>Användarnamn: {user.name}</Text>
                    <Text>Användarmail: {user.email}</Text>
                    {user.posts ? (
                        user.posts.map((post, postIndex) => (
                            <Text key={postIndex}>
                                Post: Rubrik: {String(post.title)} Innehåll:{" "}
                                {String(post.content)}{" "}
                            </Text>
                        ))
                    ) : (
                        <Text>No posts from this user</Text>
                    )}
                </View>
            ))}
            <UserSettings />
            <LogoutButton navigation={navigation} />
        </View>
    );
};

export default AdminPage;
