import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { CreatCatchReportData } from "../../interfaces/postInterfaces";
import { createCatchReport } from "../../../db/postOperations";
import { useAuth } from "../../components/AuthContext";
import { postStyles as style } from "../../styling/PostStyling";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import type { CatchReportsPageNavigationProp } from "./DisplayCatchReports";

export default function CreateCatchReport() {
  const auth = useAuth();
  const userId = auth.user?.userId ?? "";
  const navigation = useNavigation<CatchReportsPageNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>();
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("");
  const [bait, setBait] = useState("");
  const [method, setMethod] = useState("");
  const [weather, setWeather] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };
  const handleSubmit = async () => {
    if (!location || !species || !bait || !method || !weather || !userId) {
      alert("Fyll i alla de fällt som har en * ");
      return;
    }

    setLoading(true);

    const catchReportData: CreatCatchReportData = {
      location,
      species,
      bait,
      method,
      weather,
      notes,
      authorId: userId,
      waterTemp: parseFloat(waterTemp),
      image: image ? image.split(",")[1] : undefined,
      weight: parseFloat(weight),
      length: parseFloat(length),
    };

    try {
      await createCatchReport(catchReportData);
      navigation.navigate("CatchReports");
      alert("Din fångstrapport är skapad!");
    } catch (error) {
      console.error("Error submitting catch report:", error);
      alert("Gick inte att skapa rapport!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bakground1.jpg")}
      style={style.background}
    >
    <Header />
      <ScrollView>
        {!loading ? (
          <View style={style.container}>
            <TouchableOpacity style={style.button} onPress={pickImage}>
              <Text style={style.buttonText}>Ladda Upp Bild</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={style.image} />}
            <TextInput
              placeholder="Plats *"
              onChangeText={setLocation}
              value={location}
              style={style.input}
            />
            <TextInput
              placeholder="Fisk *"
              onChangeText={setSpecies}
              value={species}
              style={style.input}
            />
            <TextInput
              placeholder="Bete *"
              onChangeText={setBait}
              value={bait}
              style={style.input}
            />
            <TextInput
              placeholder="Metod *"
              onChangeText={setMethod}
              value={method}
              style={style.input}
            />
            <TextInput
              placeholder="Väder *"
              onChangeText={setWeather}
              value={weather}
              style={style.input}
            />
            <TextInput
              placeholder="Vattentemp"
              keyboardType="decimal-pad"
              onChangeText={setWaterTemp}
              value={waterTemp}
              style={style.input}
            />

            <TextInput
              placeholder="Vikten"
              keyboardType="decimal-pad"
              onChangeText={setWeight}
              value={weight}
              style={style.input}
            />

            <TextInput
              placeholder="Längd"
              keyboardType="decimal-pad"
              onChangeText={setLength}
              value={length}
              style={style.input}
            />
            <TextInput
              placeholder="Anteckningar"
              onChangeText={setNotes}
              value={notes}
              style={style.input}
            />
            <TouchableOpacity style={style.button} onPress={handleSubmit}>
              <Text style={style.buttonText}>Lägg Till</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={style.container}>
            <Text style={style.title}> Din fångstrapport laddas nu upp! </Text>
            <ActivityIndicator
              style={style.loadingIndicator}
              size={60}
              color="#0000ff"
            />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
