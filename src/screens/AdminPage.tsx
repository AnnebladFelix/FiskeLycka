import React, { useEffect, useState } from 'react';
import { UserData } from '../interfaces/userInterfaces';
import { View, Text } from 'react-native';
import { fetchUsers } from '../../db/userOperations';

const AdminPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      // console.log(allUsers);

      const userData: UserData[] = allUsers.map(user => ({
        ...user,
        userId: user.id,
        posts: user.posts || [],
      }));

      setUsers(userData);

      // userData.forEach(user => {
      //   console.log(user.posts);
      // });
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
              <Text key={postIndex}>Post: Rubrik: {String(post.title)} Innehåll: {String(post.content) } </Text>
            ))
          ) : (
            <Text>No posts from this user</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default AdminPage;