import { StyleSheet } from "react-native";

export const postStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    width: "90%",
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  flatlist: {
    flex: 1,
    paddingBottom: 20,
    marginBottom: 20,
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
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  loadingIndicator: {
    margin: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignSelf: "center", 
    width: "40%",
    margin: 10,
},
buttonText: {
    color: "#fff",
    textAlign: "center",
}
});
