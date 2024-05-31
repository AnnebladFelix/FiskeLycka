import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';

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

const FishSpeciesScreen = ({ navigation }: { navigation: any }) => {

  const fiskarter = require('../../../swedish_fish_species.json');

  const renderItem = ({ item } : {item : FishSpecies}) => (
    <TouchableOpacity onPress={() => navigation.navigate('FishDetail', { fish: item })}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.swedishName} ({item.scientificName})</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
        <Header />
      <View style={styles.container}>
        <FlatList
          data={fiskarter}
          renderItem={renderItem}
          keyExtractor={item => item.swedishName}
        />
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
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
});

export default FishSpeciesScreen;
