import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView,} from 'react-native';

export default function App() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
  }

  const handleLogoClick = () => {
    console.log('Logo clicked');
  }

  return (
    <ImageBackground
      source={require('./assets/images/bakground1.jpg')}
      style={styles.background}
    >
      {/* Header */ }
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoClick}>
          <Image source={require('./assets/images/Logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={require('./assets/images/icon-hamburger.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Body */ }
      <ScrollView style={styles.mainContent}>
        <View style={styles.container}>
          <Text>Hej Bajskorv</Text>
          <Text>Hej igen Bajskorv</Text>
          <StatusBar style="auto" />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Footer</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  logo: {
    width: 100,
    height: 80, 
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  mainContent: {
    flex: 1,
    marginTop: 100, 
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
