import { StyleSheet } from 'react-native';

export const SearchFishingWaterScreenStyling = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 0, 
    backgroundColor: '#fff',
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 25,
    margin: 10,
    borderRadius: 10,
    marginTop: 0, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
},
});