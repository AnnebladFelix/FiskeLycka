import React, { useState } from "react";
import { Button, Image, View, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { CreatCatchReportData } from "../../interfaces/postInterfaces";
import { createCatchReport } from "../../../db/postOperations";
import { useAuth } from "../../components/AuthContext";
import { userPageStyles as styles } from "../../styling/UserPagesStyling";

export default function CreateCatchReport() {
  const auth = useAuth();
  const userId = auth.user?.userId ?? "";
  const [waterTemp, setWaterTemp] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [length, setLength] = useState<number>(0);

  const [catchReportData, setCatchReportData] = useState<CreatCatchReportData>({
    location: "",
    species: "",
    bait: "",
    method: "",
    weather: "",
    authorId: userId,
    waterTemp: waterTemp,
    notes: "",
    image: "",
    weight: weight,
    length: length,
  });

  const handleInputChange = (field: keyof CreatCatchReportData, value: string | number) => {
    setCatchReportData({
      ...catchReportData,
      [field]: value,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result['uri'];
      setCatchReportData({
        ...catchReportData,
        image: uri,
      });
    }
  }

  const handleSubmit = async () => {
    await createCatchReport(catchReportData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plats"
        value={catchReportData.location}
        onChangeText={(value) => handleInputChange("location", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Art"
        value={catchReportData.species}
        onChangeText={(value) => handleInputChange("species", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bete"
        value={catchReportData.bait}
        onChangeText={(value) => handleInputChange("bait", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Metod"
        value={catchReportData.method}
        onChangeText={(value) => handleInputChange("method", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Väder"
        value={catchReportData.weather}
        onChangeText={(value) => handleInputChange("weather", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Notering"
        value={catchReportData.notes}
        onChangeText={(value) => handleInputChange("notes", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vatten temperatur"
        value={catchReportData.waterTemp.toString()}
        onChangeText={(value) => setWaterTemp(Number(value))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Vikt"
        value={catchReportData.weight.toString()}
        onChangeText={(value) => setWeight(Number(value))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Längd"
        value={catchReportData.length.toString()}
        onChangeText={(value) => setLength(Number(value))}
        keyboardType="numeric"
      />
      <Button title="Pick Image" onPress={pickImage} />
      {catchReportData.image && (
        <Image source={{ uri: catchReportData.image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
