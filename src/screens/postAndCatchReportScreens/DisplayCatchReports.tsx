import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { fetchCatchReports } from "../../../db/postOperations";
import { CatchReportData } from "../../interfaces/postInterfaces";
import { postStyles as style } from "../../styling/postStyling";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  CatchReports: undefined;
  CreateCatchReport: undefined;
};
export type CatchReportsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CatchReports'
>;

const CatchReportsPage = () => {
  const [catchReports, setCatchReports] = useState<CatchReportData[]>([]);
  const navigation = useNavigation<CatchReportsPageNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCatchReports();
      setCatchReports(data);
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);


  return (
    <ScrollView>
      <View style={style.container}>
        <Button title="Skapa ny fångstrapport" onPress={() => navigation.navigate('CreateCatchReport')} />
        <Text style={style.title}>Fångstrapporter</Text>
        <FlatList
          data={catchReports}
          renderItem={({ item }) => (
            <View style={style.card}>
              <Text>Fisk: {item.species}</Text>
              <Text>Vikt: {item.weight ? `${item.weight} kg` : 'N/A'}</Text>
              <Text>Längd: {item.length ? `${item.length} cm` : 'N/A'}</Text>
              <Text>Plats: {item.location}</Text>
              <Text>Bete: {item.bait}</Text>
              <Text>Metod: {item.method}</Text>
              <Text>Väder: {item.weather}</Text>
              <Text>Vattentemp: {item.waterTemp ? `${item.waterTemp}°C` : 'N/A'}</Text>
              <Text>Anteckningar: {item.notes}</Text>
              { item.image && 
                <Image 
                  source={{ uri: `data:image/jpeg;base64,${item.image}` }} 
                  style={style.image} 
                />
              }
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CatchReportsPage;
