import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
});
