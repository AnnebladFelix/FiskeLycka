import React, { useState } from "react";
import { Button, Image, TextInput, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { CreatCatchReportData } from "../../interfaces/postInterfaces";
import { createCatchReport } from "../../../db/postOperations";
import { useAuth } from "../../components/AuthContext";
import { postStyles as styles } from "../../styling/postStyling";
import { useNavigation } from '@react-navigation/native';
import type {CatchReportsPageNavigationProp} from "./DisplayCatchReports"


export default function CreateCatchReport() {
  const auth = useAuth();
  const userId = auth.user?.userId ?? "";
  const navigation = useNavigation<CatchReportsPageNavigationProp>();

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
      navigation.navigate("CatchReports")
      alert("Din fångstrapport är skapad!");
    } catch (error) {
      console.error("Error submitting catch report:", error);
      alert("Gick inte att skapa rapport!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button 
          title="Ladda Upp Bild"
          onPress={pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={styles.image } />
        )}
        <TextInput
          placeholder="Plats *"
          onChangeText={setLocation}
          value={location}
          style={styles.input}
        />
        <TextInput
          placeholder="Fisk *"
          onChangeText={setSpecies}
          value={species}
          style={styles.input}
        />
        <TextInput
          placeholder="Bete *"
          onChangeText={setBait} 
          value={bait}
          style={styles.input}
        />
        <TextInput
          placeholder="Metod *"
          onChangeText={setMethod}
          value={method}
          style={styles.input}
        />
        <TextInput
          placeholder="Väder *"
          onChangeText={setWeather}
          value={weather}
          style={styles.input}
        />
        <TextInput
          placeholder="Vattentemp"
          keyboardType="decimal-pad"
          onChangeText={setWaterTemp}
          value={waterTemp}
          style={styles.input}
        />

        <TextInput
          placeholder="Vikten"
          keyboardType="decimal-pad"
          onChangeText={setWeight}
          value={weight}
          style={styles.input}
        />

        <TextInput
          placeholder="Längd"
          keyboardType="decimal-pad"
          onChangeText={setLength}
          value={length}
          style={styles.input}
        />
                <TextInput 
          placeholder="Anteckningar" 
          onChangeText={setNotes} 
          value={notes} 
          style={styles.input}
        />
        <Button title="Lägg till" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
