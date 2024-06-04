import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Header from "../../components/Header";
import { SearchFishingWaterScreenStyling as styles } from "../../styling/SearchFishingWaterStyling";

interface Lake {
    latitude: number;
    longitude: number;
    title: string;
    name: string;
}

const SearchFishingWaterScreen = ({ navigation }: { navigation: any }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredLakes, setFilteredLakes] = useState<Lake[]>([]);

    const lakes: Lake[] = [
        {
            latitude: 57.431835,
            longitude: 12.664502,
            title: "Västra Öresjön",
            name: "Västra Öresjön",
        },
        {
            latitude: 57.648468,
            longitude: 13.376188,
            title: "Sämsjön_(Finnekumla_socken,_Västergötland)",
            name: "Sämsjön",
        },
        {
            latitude: 57.641907,
            longitude: 12.406097,
            title: "Stora_Kåsjön",
            name: "Kåsjön",
        },
        {
            latitude: 57.63423,
            longitude: 12.137591,
            title: "Finnsjön,_Västergötland",
            name: "Finnsjön",
        },
        {
            latitude: 56.548056,
            longitude: 12.949444,
            title: "Lagan",
            name: "Lagan",
        },
        {
            latitude: 57.78754,
            longitude: 12.97886,
            title: "Öresjö_(Fristads_socken,_Västergötland)",
            name: "Öresjön",
        },
        {
            latitude: 58.916663,
            longitude: 13.499998,
            title: "Vänern",
            name: "Vänern",
        },
        {
            latitude: 58.32266,
            longitude: 14.48427,
            title: "Vättern",
            name: "Vättern",
        },
    ];

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text) {
            const filtered = lakes.filter((lake) =>
                lake.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredLakes(filtered);
        } else {
            setFilteredLakes([]);
        }
    };

    const handleSelectLake = (lake: Lake) => {
        const formattedTitle = lake.title.replace(/_/g, " ");
        console.log("Navigating to:", formattedTitle);
        navigation.navigate("FishingWater", { title: formattedTitle });
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/bakground1.jpg")}
            style={styles.background}
        >
            <View style={styles.wrapper}>
                <Header />
                <View style={styles.container}>
                    <TextInput
                        placeholder="Sök fiskevatten"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={styles.searchInput}
                    />
                    {filteredLakes.length > 0 && (
                        <View style={styles.card}>
                            <FlatList
                                data={filteredLakes}
                                keyExtractor={(item) => item.title}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSelectLake(item)}
                                    >
                                        <Text style={styles.item}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};

export default SearchFishingWaterScreen;
