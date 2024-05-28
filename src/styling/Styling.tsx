import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-start',
    },
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      marginTop:40,
    },
    input: {
      width: '100%',
      height: 40,
      padding: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    createAccountButton: {
      marginTop: 16,
    },
    createAccountText: {
      color: '#007BFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    success: {
        color: 'green',
        marginTop: 10,
    },
  });