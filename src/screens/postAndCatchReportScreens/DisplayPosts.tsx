import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { fetchPosts } from "../../../db/postOperations";
import { PostData } from "../../interfaces/postInterfaces";
import Header from "../../components/Header";
import { userPageStyles as style } from "../../styling/UserPagesStyling";

const PostsPage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <View style={style.container}>
    <Header />
      <Text style={style.title}>Fångstrapporter</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={style.container}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            {item.image && <Image source={{ uri: item.image }} />}
            {item.reports &&
              item.reports.map((report) => (
                <View key={report.id}>
                  <Text>{report.species}</Text>
                  {report.weight && <Text>{report.weight}</Text>}
                  {report.length && <Text>{report.length}</Text>}
                  <Text>{report.bait}</Text>
                  {report.method && <Text>{report.method}</Text>}
                  {report.weather && <Text>{report.weather}</Text>}
                  {report.waterTemp && <Text>{report.waterTemp}</Text>}
                  {report.notes && <Text>{report.notes}</Text>}
                  {report.image && <Image source={{ uri: report.image }} />}
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
};

export default PostsPage;
