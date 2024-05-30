import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { headerStyles as styles } from '../styling/headerStyling';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogoClick = () => {
    navigation.navigate('Home');
  };

  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLogoClick}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginClick}>
        <Image source={require('../../assets/images/login+fish.png')} style={styles.loginLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;