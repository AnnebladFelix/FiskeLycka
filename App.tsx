
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput} from 'react-native';
import MapScreen from './src/screens/MapScreen';
import FishSpeciesScreen from './src/screens/FishSpeciesScreen';
import FishingWaterScreen from './src/screens/FishingWaterScreen';
import FishingMethodsScreen from './src/screens/FingingMethodsScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map Screen' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Screen' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup Screen' }} />
        <Stack.Screen name="FishSpecies" component={FishSpeciesScreen} options={{ title: 'Fish Species Screen' }} />
        <Stack.Screen name="FishingWater" component={FishingWaterScreen} options={{ title: 'FishingWater Screen' }} />
        <Stack.Screen name="FishingMethods" component={FishingMethodsScreen} options={{ title: 'Fishing Methods Screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }: { navigation: any}) => {
  const handleMenuClick = () => {
    console.log('Menu clicked');
  }

  const handleLogoClick = () => {
    console.log('Logo clicked');
  }

  
  const goToLoginScreen = () => {
    navigation.navigate('Login');
  };

  const goToMapScreen = () => {
    navigation.navigate('Map');
  };

  const goToFishSpeciesScreen = () => {
    navigation.navigate('FishSpecies');
  }; 

  const goToFishingWaterScreen = () => {
    navigation.navigate('FishingWater');
  };

  const goToFishingMethodsScreen = () => {
    navigation.navigate('FishingMethods');
  };

  return (
    <ImageBackground
      source={require('./assets/images/bakground1.jpg')}
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoClick}>
          <Image source={require('./assets/images/Logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLoginScreen}>
          <Image source={require('./assets/images/login+fish.png')} style={styles.loginLogo} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView style={styles.mainContent}>
        {/* Searchbar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Sök fiskevatten" style={styles.searchInput} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.kartaButton]} onPress={goToMapScreen}>
            <ImageBackground source={require('./assets/images/karta.png')} style={styles.buttonBackground}>
              <Text style={styles.buttonText}>Karta</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={goToFishingWaterScreen}>
            <Text style={styles.buttonText}>Fiskevatten</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={goToFishSpeciesScreen}>
            <Text style={styles.buttonText}>Fiskarter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToFishingMethodsScreen}>
            <Text style={styles.buttonText}>Fiske Metoder</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.singleButton}>
          <Text style={styles.buttonText}>Mina Fiskekort</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>@Copywrite 2024</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  logo: {
    marginTop:20,
    width: 100,
    height: 80, 
    resizeMode: 'contain',
  },
  loginLogo: {
    marginTop:20,
    marginBottom:10,
    width: 80,
    height: 60, 
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 10,
  },
  mainContent: {
    flex: 1,
    marginTop: 120, 
  },
  searchContainer: {
    marginTop:10,
    padding: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    color: 'black',
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.91)',
    borderRadius: 5,
    width: '45%',
    height: '55%',
    aspectRatio: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kartaButton: {
    width: '45%',
  },
  buttonBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
  singleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.918)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 50,
  },
  footer: {
    height: 50, 
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
