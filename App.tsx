import { StatusBar } from 'expo-status-bar';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image,} from 'react-native';

export default function App() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
  }

  return (
    <ImageBackground
      source={require('./assets/images/bakground1.jpg')}
      style={styles.background}
    >
      {/* Header */ }
      <View style={styles.header}>
        <Text>Header</Text>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuClick}>
        <Image source={require('./assets/images/icon-hamburger.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Body */ }
      <View style={styles.container}>
        <Text>Hej Bajskorv</Text>
        <Text>Hej igen Bajskorv</Text>
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
    justifyContent: 'flex-end',
    height: 100,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  menuButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
