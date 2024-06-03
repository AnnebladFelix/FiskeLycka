import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { FishingMethodsScreenStyling as styles } from '../../styling/FishingMethodsScreenStyling';

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

export default FishingMethodsScreen;
