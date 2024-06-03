import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import Header from "../../components/Header";

interface FishSpecies {
  swedishName: string;
  scientificName: string;
  description: string;
  occurrence: string;
  habitat: string;
  minimumSize: string;
  swedishRecord: string;
  lake: string;
}

const FishDetailScreen = ({ route }: { route: any }) => {
  const fish: FishSpecies = route.params.fish;

  const [fishImage, setFishImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFishImage = async () => {
      try {
        const response = await axios.get('https://sv.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            prop: 'pageimages|pageterms',
            pithumbsize: 500,
            titles: fish.swedishName,
            format: 'json',
            origin: '*',
          },
        });

        console.log('API response:', response.data); // Debugging output

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId !== '-1' && pages[pageId].thumbnail) {
          setFishImage(pages[pageId].thumbnail.source);
        } else {
          setError('No image found for this fish');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the fish image');
      } finally {
        setLoading(false);
      }
    };

    fetchFishImage();
  }, [fish.swedishName]);

  return (
    <View>
        <Header />
      <Text>{fish.swedishName} ({fish.scientificName})</Text>
      <Text>{fish.description}</Text>
      <Text>Förekomst: {fish.occurrence}</Text>
      <Text>Habitat: {fish.habitat}</Text>
      <Text>Minsta storlek: {fish.minimumSize}</Text>
      <Text>Svenskt rekord: {fish.swedishRecord}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : fishImage ? (
        <Image
          source={{ uri: fishImage }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <Text>No image of the fish</Text>
      )}
    </View>
  );
};

export default FishDetailScreen;
