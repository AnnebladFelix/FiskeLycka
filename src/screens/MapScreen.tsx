import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hitta din nya fiskeplats</Text>

      <MapView style={styles.map}>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  map: {
    width: '100%',
    height: '50%',
  }
})

export default MapScreen;