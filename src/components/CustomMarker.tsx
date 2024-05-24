import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
}

interface CustomMarkerProps {
  markers: MarkerData[];
  navigation: any;
}
const formatMarkerTitle = (title: string) => {
  const formattedTitle = title.replace(/_/g, ' ');

  return formattedTitle;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({ markers, navigation }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={formatMarkerTitle(marker.title)}
          onPress={() => navigation.navigate('FishingWater', { title: formatMarkerTitle(marker.title) })}
        >
            <Callout tooltip style={styles.calloutView}>
                <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>
                        {formatMarkerTitle(marker.title)}
                    </Text>
                    <Text style={styles.calloutDescription}>
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