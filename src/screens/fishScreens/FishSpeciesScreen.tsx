import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import Header from '../../components/Header';
import { FishSpeciesScreenStyling as styles } from '../../styling/FishSpeciesScreenStyling';

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
    <ImageBackground
            source={require("../../../assets/images/bakground1.jpg")}
            style={styles.background}
        >
    <View style={styles.wrapper}>
        {/* <Header /> */}
      <View style={styles.container}>
        <Text style={styles.text}>Fiskarter</Text>
        <FlatList
          data={fiskarter}
          renderItem={renderItem}
          keyExtractor={item => item.swedishName}
        />
      </View>

    </View>
    </ImageBackground>
  );
};

export default FishSpeciesScreen;
