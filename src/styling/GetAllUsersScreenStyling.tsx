import { StyleSheet } from 'react-native';

export const GetAllUsersScreenStyling = StyleSheet.create({
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
});