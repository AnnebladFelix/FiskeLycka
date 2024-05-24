import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const formatMarkerTitle = (title: string) => {
  const formattedTitle = title.replace(/_/g, ' ');

  return formattedTitle;
};

const FishingWaterScreen = ({ route }: { route: any }) => {
  const { title } = route.params;
  const [lakeInfo, setLakeInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLakeInfo = async () => {
      try {
        const response = await axios.get('https://sv.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            prop: 'extracts',
            exintro: true,
            explaintext: true,
            titles: title,
            format: 'json',
            origin: '*', 
          },
        });

        console.log(response.data);
        
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1') {
          setLakeInfo(pages[pageId].extract);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formatMarkerTitle(title)}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Text style={styles.text}>{lakeInfo}</Text>
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
});

export default FishingWaterScreen;
