import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput} from 'react-native';
import MapScreen from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map Screen' }} />
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

  const goToMapScreen = () => {
    navigation.navigate('Map');
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
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
          <Image source={require('./assets/images/icon-hamburger.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView style={styles.mainContent}>
        {/* Searchbar */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.kartaButton]} onPress={goToMapScreen}>
            <ImageBackground source={require('./assets/images/karta.png')} style={styles.buttonBackground}>
              <Text style={styles.buttonText}>Karta</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Fiska</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Fiskarter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
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
        <Text>Footer</Text>
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
    alignItems: 'center',
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
  menuButton: {
    padding: 10,
  },
  icon: {
    marginTop:20,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  mainContent: {
    flex: 1,
    marginTop: 100, 
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
    backgroundColor: 'rgba(255, 255, 255, 0.918)',
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
