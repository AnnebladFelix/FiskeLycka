import React, { useEffect, useState } from "react";
import { UserData } from "../../interfaces/userInterfaces";
import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { fetchUsers } from "../../../db/userOperations";
import Header from "../../components/Header";
import { GetAllUsersScreenStyling as styles } from "../../styling/GetAllUsersScreenStyling";

function GetAllUsersScreen() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      setLoading(false);

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
    <ImageBackground
      source={require("../../../assets/images/bakground1.jpg")}
      style={styles.background}
    >
      <Header />
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size={60}
          color="#0000ff"
        />
      ) : (
        users.map((user, index) => (
          <View key={index}>
            <View style={styles.card}>
              <Text>Användarnamn: {user.name}</Text>
              <Text>E-mail: {user.email}</Text>
              {user.posts && user.posts.length > 0 ? (
                user.posts.map((post, postIndex) => (
                  <Text key={postIndex}>
                    Post: Rubrik: {String(post.title)} Innehåll:{" "}
                    {String(post.content)}{" "}
                  </Text>
                ))
              ) : (
                <View>
                  <Text>
                    Den här användaren har inte lagt ut några POSTS än
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}
    </ImageBackground>
  );
}

export default GetAllUsersScreen;
