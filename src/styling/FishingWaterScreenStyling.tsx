import { StyleSheet } from 'react-native';

export const FishingWaterScreenStyle = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    scrollView: {
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
    image: {
      width: 300,
      height: 200,
      resizeMode: 'contain',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      marginVertical: 8,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    noFishText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
    },
  });