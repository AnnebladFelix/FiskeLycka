import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {
  BoatRental,
  FishingLicenseSale,
  DepthMap,
  FishingService,
  OtherService,
  FishingCardInfo
} from '../../components/FishingCardData';

interface Fish {
  swedishName: string;
  lakes: string[];
}

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
  const [fishingCardInfo, setFishingCardInfo] = useState<FishingCardInfo | null>(null);

  const fiskarter: Fish[] = require('../../../swedish_fish_species.json');
  const fishingCardData: FishingCardInfo[] = require('../../../fishingCardData.json');

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

    const cardInfo = fishingCardData.find(info => info.lake === title);
    setFishingCardInfo(cardInfo || null);


  }, [title]);

  const handleFishDetailNavigation = (fish: Fish) => {
    navigation.navigate('FishDetail', { fish });
  };

  const relevantFish = fiskarter.filter(fish => fish.lakes && fish.lakes.includes(title!));

  return (
    <View style={styles.wrapper}>
      <Header />
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
            {fishingCardInfo && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Fiskekort & Övrig Info:</Text>
                {fishingCardInfo.boatRental && (
                  <>
                    <Text style={styles.cardSection}>Båtuthyring:</Text>
                    <Text>{fishingCardInfo.boatRental.name}</Text>
                    <Text>{fishingCardInfo.boatRental.phone}</Text>
                  </>
                )}
                <Text style={styles.cardSection}>Fiskekortsförsäljning:</Text>
                {fishingCardInfo.fishingLicenseSales.map((item, index) => (
                  <View key={index}>
                    <Text>{item.name}</Text>
                    {item.phone &&<Text>{item.phone}</Text>}
                    {item.link && (
                      <TouchableOpacity onPress={() => Linking.openURL(item.link!)}>
                        <Text style={styles.linkText}>{item.link}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                {fishingCardInfo.fishingService && (
                  <>
                    <Text style={styles.cardSection}>Fiskeservice:</Text>
                    <Text>{fishingCardInfo.fishingService.depthMap.info}</Text>
                    <Text>Pris: {fishingCardInfo.fishingService.depthMap.price}</Text>
                  </>
                )}
                {fishingCardInfo.otherServices && (
                  <>
                    <Text style={styles.cardSection}>Övrig service och aktiviteter i närområdet:</Text>
                    {fishingCardInfo.otherServices.map((service, index) => (
                    <View key={index}>
                      <Text>{service.type}</Text>
                      <Text>{service.provider}</Text>
                      <Text>{service.phone}</Text>
                    </View>
                ))}
                </>
                )}
              </View>
            )}
            <Text style={styles.title}>Fiskarter i denna sjön:</Text>
            {relevantFish.length > 0 ? (
              relevantFish.map(fish => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSection: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
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
