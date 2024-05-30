import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const formatMarkerTitle = (title: string) => {
  const formattedTitle = title.replace(/_/g, ' ');

  return formattedTitle;
};

const FishingWaterScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const title = route.params?.title;
  const [lakeInfo, setLakeInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lakeImage, setLakeImage] = useState<string | null>(null);

  const fiskarter = require('../../swedish_fish_species.json');

  useEffect(() => {
    if (!title) {
      setError('No title provided');
      setLoading(false);
      return;
    }
    const fetchLakeInfo = async () => {
      try {
        const response = await axios.get('https://sv.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            prop: 'extracts|pageimages',
            pithumbsize: 500,
            exintro: true,
            explaintext: true,
            titles: title,
            format: 'json',
            origin: '*', 
          },
        });
        
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1') {
          setLakeInfo(pages[pageId].extract);
          if (pages[pageId].thumbnail) {
            setLakeImage(pages[pageId].thumbnail.source);
          }
        } else {
          setError('No information found');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchLakeInfo();
  }, [title]);

  const handleFishDetailNavigation = (fish: any) => {
    navigation.navigate('FishDetail', { fish });
  };

  const relevantFish = fiskarter.filter((fish: any) => fish.lakes && fish.lakes.includes(title));

  console.log('Relevant fish:', relevantFish);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formatMarkerTitle(title)}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView>
          {lakeImage && <Image source={{ uri: lakeImage }} style={styles.image} />}
          <Text style={styles.text}>{lakeInfo}</Text>
          {relevantFish.length > 0 ? (
            relevantFish.map((fish: any) => (
              <TouchableOpacity
                key={fish.swedishName}
                style={styles.button}
                onPress={() => handleFishDetailNavigation(fish)}
              >
                <Text style={styles.buttonText}>{fish.swedishName}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noFishText}>No fish found for this lake.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  noFishText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default FishingWaterScreen;
