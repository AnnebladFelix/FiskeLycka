import { StyleSheet } from "react-native";

export const FishSpeciesScreenStyling = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    itemContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
    },
});
