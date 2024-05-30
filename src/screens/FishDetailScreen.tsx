import React from "react";
import { View, Text } from "react-native";
import Header from '../components/Header'

interface FishSpecies {
    swedishName: string;
    scientificName: string;
    description: string;
    occurrence: string;
    habitat: string;
    minimumSize: string;
    swedishRecord: string;
}

const FishDetailScreen = ({ route }: { route: any }) => {
    const fish: FishSpecies = route.params.fish;

    return (
        <View>
            <Header />
            <Text>
                {fish.swedishName} ({fish.scientificName})
            </Text>
            <Text>{fish.description}</Text>
            <Text>Förekomst: {fish.occurrence}</Text>
            <Text>Habitat: {fish.habitat}</Text>
            <Text>Minsta storlek: {fish.minimumSize}</Text>
            <Text>Svenskt rekord: {fish.swedishRecord}</Text>
        </View>
    );
};

export default FishDetailScreen;
