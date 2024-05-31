import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchCatchReports } from "../../../db/postOperations";
import { CatchReportData } from "../../interfaces/postInterfaces";
import { userPageStyles as style } from "../../styling/UserPagesStyling";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  CatchReportsPage: undefined;
  CreateCatchReport: undefined;
};
export type CatchReportsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CatchReportsPage'
>;

const CatchReportsPage = () => {
  const [catchReports, setCatchReports] = useState<CatchReportData[]>([]);
  const navigation = useNavigation<CatchReportsPageNavigationProp>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCatchReports();
      setCatchReports(data);
    };

    fetchData();
  }, []);

  return (
    <View style={style.container}>
      <Button title="Skapa ny fångstrapport" onPress={() => navigation.navigate('CreateCatchReport')} />
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
