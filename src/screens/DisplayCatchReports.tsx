import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchCatchReports, fetchPosts } from '../../db/postOperations';
import { CatchReportData } from '../interfaces/postInterfaces';
import { userPageStyles as style } from '../styling/UserPagesStyling';

const CatchReportsPage = () => {

const [catchReports, setCatchReports] = useState<CatchReportData[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await fetchCatchReports();
    setCatchReports(data);
  };
  
  fetchData();
},[]);

return (
  <View style={style.container}>
      <Text style={style.title}>Fångstrapporter</Text>
      <FlatList
        data={catchReports}
        renderItem={({ item }) => (
          <View style={style.container}>
            <Text>Fisk: {item.species}</Text>
            <Text>Vikt: {item.weight}</Text>
            <Text>Längd: {item.length} cm</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CatchReportsPage;
