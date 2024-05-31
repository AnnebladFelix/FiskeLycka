import React, { useEffect, useState } from "react";
import { UserData } from "../../interfaces/userInterfaces";
import { View, Text, Button } from "react-native";
import { fetchUsers } from "../../../db/userOperations";
import UserScreen from "./UserScreen";
import { useAuth } from "../../components/AuthContext";

const AdminPage = ({ navigation }: { navigation: any }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const { logout } = useAuth();

    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetchUsers();
            // console.log(allUsers);

            const userData: UserData[] = allUsers.map((user) => ({
                ...user,
                userId: user.userId,
                posts: user.posts || [],
            }));

            setUsers(userData);

            // userData.forEach(user => {
            //   console.log(user.posts);
            // });
        };

        getUsers();
    }, []);

    const handleLogOutClick = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }, { name: "Login" }],
        });
    };

    return (
        <View>
            <View>
                <Button title="Logga ut" onPress={handleLogOutClick} />
            </View>
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
            <UserScreen navigation={navigator} />
        </View>
    );
};

export default AdminPage;
