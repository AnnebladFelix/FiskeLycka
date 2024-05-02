import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';




const INITIAL_REGION = {
  latitude: 57.709127,
  longitude: 11.934746,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hitta din nya fiskeplats</Text>

      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        >
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
    height: '100%',
  },
})

export default MapScreen;