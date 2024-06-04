import { StyleSheet } from "react-native";

export const FishingMethodsScreenStyling = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        // flex: 1,
        padding: 10,
        backgroundColor: "rgba(232,232,232,0.8)",
        margin: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 24,
        alignSelf: "center",
        fontWeight: "bold",
    },  
    itemContainer: {
        flex: 1,
        backgroundColor: "rgb(240, 240, 240)",
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
        margin: 10,
    },
    itemText: {
        fontSize: 18,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
    },
});
