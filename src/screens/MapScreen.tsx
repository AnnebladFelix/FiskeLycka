import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Device from 'expo-device';


interface Position {
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapViewRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      if(Platform.OS === 'android' && Device && Device.isDevice) {
        setErrorMsg(
          'Ops, this did not work on a emulator, test on your device instead!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }, 1000);
      }
    })();
  }, []);
                

  return (
    <View style={styles.container}>
      <Text>Hitta din nya fiskeplats</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (

      <MapView 
        ref={mapViewRef}
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221,
        }}
        showsUserLocation={true}
        >
          {currentPosition && (
            <Marker
              coordinate={currentPosition}
              title={'Din Plats'}
            />
          )}
      </MapView>
      )}
    </View>
  );
};

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