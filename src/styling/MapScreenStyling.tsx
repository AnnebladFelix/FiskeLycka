import { StyleSheet } from 'react-native';

export const MapScreenStyling = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "flex-start",
    },
  })