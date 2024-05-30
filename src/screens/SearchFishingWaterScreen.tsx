import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';


interface Lake {
    latitude: number;
    longitude: number;
    title: string;
    name: string;
}

const SearchFishingWaterScreen = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLakes, setFilteredLakes] = useState<Lake[]>([]);

  const lakes: Lake[] = [
    { latitude: 57.431835, longitude: 12.664502, title: 'Västra Öresjön', name: 'Västra Öresjön' },
    { latitude: 57.648468, longitude: 13.376188, title: 'Sämsjön_(Finnekumla_socken,_Västergötland)', name: 'Sämsjön' },
    { latitude: 57.641907, longitude: 12.406097, title: 'Stora_Kåsjön', name: 'Kåsjön' },
    { latitude: 57.63423, longitude: 12.137591, title: 'Finnsjön,_Västergötland', name: 'Finnsjön' },
    { latitude: 56.548056, longitude: 12.949444, title: 'Lagan', name: 'Lagan' },
    { latitude: 57.78754, longitude: 12.97886, title: 'Öresjö_(Fristads_socken,_Västergötland)', name: 'Öresjön' },
    { latitude: 58.916663, longitude: 13.499998, title: 'Vänern', name: 'Vänern' },
    { latitude: 58.32266, longitude: 14.48427, title: 'Vättern', name: 'Vättern' },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = lakes.filter((lake) =>
        lake.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLakes(filtered);
    } else {
      setFilteredLakes([]);
    }
  };

  const handleSelectLake = (lake: Lake) => {
    navigation.navigate('FishingWater', { title: lake.title });
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        placeholder="Sök fiskevatten"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredLakes}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectLake(item)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default SearchFishingWaterScreen;
