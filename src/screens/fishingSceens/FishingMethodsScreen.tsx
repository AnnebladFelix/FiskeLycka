import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';


export interface FishingMethods {
  name: string;
  description: string;
  equipment: {
    [key: string]: any;
  };
  tips?: {
    [key: string]: string;
  };
}

const FishingMethodsScreen = ({ navigation }: { navigation: any }) => {

  const methods = require('../../../fishingmethods.json');

  const renderItem = ({ item } : {item : FishingMethods}) => (
    <TouchableOpacity onPress={() => navigation.navigate('FishingMethod', { method: item })}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={methods}
          renderItem={renderItem}
          keyExtractor={item => item.name}
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

export default FishingMethodsScreen;
