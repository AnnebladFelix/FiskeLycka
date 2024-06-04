import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { postStyles as style } from "../../styling/PostStyling";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { fetchCatchReports } from "../../../db/postOperations";
import { CatchReportData } from "../../interfaces/postInterfaces";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../../components/Header";

type RootStackParamList = {
  CatchReports: undefined;
  CreateCatchReport: undefined;
};
export type CatchReportsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CatchReports"
>;

const CatchReportsPage = () => {
  const [catchReports, setCatchReports] = useState<CatchReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<CatchReportsPageNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCatchReports();
      setCatchReports(data);
      setLoading(false);
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <ImageBackground
      source={require("../../../assets/images/bakground1.jpg")}
      style={style.background}
    >
      <Header />
      <SafeAreaView style={style.container}>
        <Text style={style.title}>Fångstrapporter</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCatchReport")}
          style={style.button}
        >
          <Text style={style.buttonText}>Skapa ny fångstrapport</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            style={style.loadingIndicator}
            size={60}
            color="#0000ff"
          />
        ) : (
          <>
            {catchReports.length === 0 ? (
              <View style={style.card}>
                <Text style={style.title}>Just nu finns det inget här!</Text>
                <Text>Kolla så du har närverk eller om FiskeLycka ligger nere tillfälligt!</Text>
              </View>
            ) : (
              <FlatList
                style={style.flatlist}
                data={catchReports}
                renderItem={({ item }) => (
                  <View style={style.card}>
                    <Text>Fisk: {item.species}</Text>
                    <Text>
                      Vikt: {item.weight ? `${item.weight} kg` : "N/A"}
                    </Text>
                    <Text>
                      Längd: {item.length ? `${item.length} cm` : "N/A"}
                    </Text>
                    <Text>Plats: {item.location}</Text>
                    <Text>Bete: {item.bait}</Text>
                    <Text>Metod: {item.method}</Text>
                    <Text>Väder: {item.weather}</Text>
                    <Text>
                      Vattentemp:{" "}
                      {item.waterTemp ? `${item.waterTemp}°C` : "N/A"}
                    </Text>
                    <Text>Anteckningar: {item.notes}</Text>
                    {item.image && (
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                        style={style.image}
                      />
                    )}
                  </View>
                )}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CatchReportsPage;
