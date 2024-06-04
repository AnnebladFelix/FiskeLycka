import { StyleSheet } from "react-native";

export const FishingWaterScreenStyle = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: "contain",
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
  infoCard: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSection: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  noFishText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
