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
      // Style for the callout bubble
    },
    calloutContainer: {
      width: '100%', // Adjust the width as needed
      height: '50%', // Adjust the height as needed
      backgroundColor: 'white',
      // Additional styles for the container
    },
    calloutTitle: {
      // Style for the title text
    },
    calloutDescription: {
      // Style for the description text
    },
  });

export default CustomMarker;