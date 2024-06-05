import React, { useEffect, useState } from "react";
import { UserData } from "../../interfaces/userInterfaces";
import { View, Text, ImageBackground, ActivityIndicator, ScrollView } from "react-native";
import { fetchUsers } from "../../../db/userOperations";
import Header from "../../components/Header";
import { GetAllUsersScreenStyling as styles } from "../../styling/GetAllUsersScreenStyling";
import { TouchableOpacity } from "react-native-gesture-handler";
import NetworkStatus from "../../components/NetworkStatus";

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
          <ScrollView>
          {loading ? (
              <ActivityIndicator
                  style={styles.loadingIndicator}
                  size={60}
                  color="#0000ff"
              />
          ) : (
            <>
              {users.length === 0 ?(
                <View style={styles.card}>
                <Text style={styles.title}>Just nu finns det inget här!</Text>
                <NetworkStatus />
                <Text>
                  Kolla så du har närverk eller om FiskeLycka ligger nere
                  tillfälligt!
                </Text>
              </View>
              ):(users.map((user, index) => (
                  <View key={index}>
                      <View style={styles.card}>
                          <Text>Användarnamn: {user.name}</Text>
                          <Text>E-mail: {user.email}</Text>
                          {user.posts && user.posts.length > 0 ? (
                              user.posts.map((post, postIndex) => (
                                  <Text key={postIndex}>
                                      Post: Rubrik: {String(post.title)}{" "}
                                      Innehåll: {String(post.content)}{" "}
                                  </Text>
                              ))
                          ) : (
                              <View>
                                  <Text>
                                      Den här användaren har inte lagt ut
                                      några POSTS än
                                  </Text>
                              </View>
                          )}
  
                          <TouchableOpacity style={styles.button}>
                              <Text style={styles.buttonText}>EDIT</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.button}>
                              <Text style={styles.buttonText}>DELETE</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              )))}
            </>
          )}
          </ScrollView>
      </ImageBackground>
  );
} 

export default GetAllUsersScreen;
