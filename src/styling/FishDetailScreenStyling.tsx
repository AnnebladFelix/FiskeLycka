import { StyleSheet } from "react-native";

export const FishDetailScreenStyling = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCF7",
      },
      mainHeaderText:{
        fontSize:24,
        fontWeight: 'bold',
        marginTop:10,
      },
      content: {
        padding: 10,
    },
    subHeaderText: {
      fontSize: 16,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10,
    },
    bodyText: {
      fontSize: 16,
      marginBottom: 10,
    },
    image: {
        width: 400,
        height: 300,
        alignSelf: "center",
        margin: 5, 
    },
    errorText: {
        fontSize:17,
        color: "red",
        textAlign: "center",
    },
    loadingIndicator: {
        marginTop: 20,
    },
});
