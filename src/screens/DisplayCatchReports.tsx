import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchCatchReports, fetchPosts } from '../../db/postOperations';
import { CatchReportData, PostData } from '../interfaces/postInterfaces';
import { userPageStyles as style } from '../styling/UserPagesStyling';

const CatchReportsPage = () => {

const [catchReports, setCatchReports] = useState<CatchReportData[]>([]);
const [posts, setPosts] = useState<PostData[]>([]);
console.log("🚀 ~ CatchReportsPage ~ posts:", posts)
console.log("🚀 ~ CatchReportsPage ~ catchReports:", catchReports)

useEffect(() => {
    const fetchData = async () => {
        const data = await fetchCatchReports();
        setCatchReports(data);
    };

    fetchData();
}, []);
useEffect(() => {
    const fetchData = async () => {
        const data = await fetchPosts();
        setPosts(data);
    };

    fetchData();
}, []);


  return (
    <View style={style.container}>
      <Text style={style.title}>Fångstrapporter</Text>
      <FlatList
        data={catchReports}
        renderItem={({ item }) => (
          <View style={style.container}>
            <Text>{item.species}</Text>
            <Text>{item.weight}</Text>
            <Text>{item.length}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CatchReportsPage;
