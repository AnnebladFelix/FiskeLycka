import { StyleSheet } from "react-native";

export const FishDetailScreenStyling = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
  },
  mainHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    padding: 10,
  },
  subHeaderText: {
    fontSize: 16,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 17,
    color: "red",
    textAlign: "center",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 25,
    margin: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    alignSelf: "center",
    margin: 5,
  },
});
