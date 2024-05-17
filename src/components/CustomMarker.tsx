import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

interface CustomMarkerProps {
  markers: MarkerData[];
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ markers }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          onPress={() => console.log('Marker Pressed')}
        >
            <Callout tooltip style={styles.calloutView}>
                <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>
                        {marker.title}
                    </Text>
                    <Text style={styles.calloutDescription}>
                        {marker.description}
                    </Text>
                </View>

            </Callout>
        </Marker>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
    calloutView: {
    },
    calloutContainer: {
      width: '100%', 
      height: '50%', 
      backgroundColor: 'white',
    },
    calloutTitle: {
    },
    calloutDescription: {
    },
  });

export default CustomMarker;