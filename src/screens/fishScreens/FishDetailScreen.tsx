import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import Header from "../../components/Header";
import { FishDetailScreenStyling as styles } from "../../styling/FishDetailScreenStyling";

interface FishSpecies {
    swedishName: string;
    scientificName: string;
    description: string;
    occurrence: string;
    habitat: string;
    minimumSize: string;
    swedishRecord: string;
    lake: string;
}

const FishDetailScreen = ({ route }: { route: any }) => {
    const fish: FishSpecies = route.params.fish;

    const [fishImage, setFishImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFishImage = async () => {
            try {
                const response = await axios.get(
                    "https://sv.wikipedia.org/w/api.php",
                    {
                        params: {
                            action: "query",
                            prop: "pageimages|pageterms",
                            pithumbsize: 500,
                            titles: fish.swedishName,
                            format: "json",
                            origin: "*",
                        },
                    }
                );

                const pages = response.data.query.pages;
                const pageId = Object.keys(pages)[0];

                if (pageId !== "-1" && pages[pageId].thumbnail) {
                    setFishImage(pages[pageId].thumbnail.source);
                } else {
                    setError("Ingen bild hittades för denna fiskart");
                }
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the fish image");
            } finally {
                setLoading(false);
            }
        };

        fetchFishImage();
    }, [fish.swedishName]);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.mainHeaderText}>{fish.swedishName}</Text>
                <Text style={styles.subHeaderText}>
                    ({fish.scientificName})
                </Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : fishImage ? (
                    <Image
                        source={{ uri: fishImage }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.bodyText}>
                        Ingen bild hittades för denna fiskart
                    </Text>
                )}
                <Text style={styles.headerText}>Beskrivning</Text>
                <Text style={styles.bodyText}>{fish.description}</Text>
                <Text style={styles.headerText}>Förekomst</Text>
                <Text style={styles.bodyText}>{fish.occurrence}</Text>
                <Text style={styles.headerText}>Habitat</Text>
                <Text style={styles.bodyText}>{fish.habitat}</Text>
                <Text style={styles.headerText}>Minsta storlek</Text>
                <Text style={styles.bodyText}>{fish.minimumSize}</Text>
                <Text style={styles.headerText}>Svenskt rekord</Text>
                <Text style={styles.bodyText}>{fish.swedishRecord}</Text>
            </View>
        </View>
    );
};

export default FishDetailScreen;
