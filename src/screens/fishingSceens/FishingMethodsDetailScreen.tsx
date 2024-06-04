import React from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import Header from "../../components/Header";
import { FishingMethodsDetailScreenStyling as styles } from "../../styling/FishingMethodsDetailScreenStyling";

const FishingMethodDetailScreen = ({ route }: any) => {
    const { method } = route.params;

    const renderEquipment = (equipment: { [key: string]: any }) => {
        return Object.entries(equipment).map(([key, value]) => {
            if (typeof value === "object") {
                return (
                    <View key={key} style={styles.equipmentSection}>
                        <Text style={styles.equipmentTitle}>{key}</Text>
                        {renderEquipment(value)}
                    </View>
                );
            }
            return (
                <View key={key} style={styles.equipmentSection}>
                    <Text style={styles.equipmentTitle}>{key}</Text>
                    <Text>{value}</Text>
                </View>
            );
        });
    };

    return (
        <ImageBackground
        source={require("../../../assets/images/bakground1.jpg")}
        style={styles.background}
      >
        <View style={styles.wrapper}>
            <Header />
            <ScrollView style={styles.card}>
                <Text style={styles.title}>{method.name}</Text>
                <Text style={styles.description}>{method.description}</Text>
                <Text style={styles.sectionTitle}>Utrustning:</Text>
                {renderEquipment(method.equipment)}
                {method.tips && (
                    <View style={styles.equipmentContainer}>
                        <Text style={styles.sectionTitle}>Tips:</Text>
                        {Object.entries(method.tips).map(([key, value]) => (
                            <View key={key} style={styles.equipmentSection}>
                                <Text style={styles.equipmentTitle}>{key}</Text>
                                <Text>{value as string}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
        </ImageBackground>
    );
};


export default FishingMethodDetailScreen;
