import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../../components/Header";
import { FishingMethodsDetailScreenStyling as styles } from "../../styling/FishingMethodsDetailScreenStyling";

const FishingMethodDetailScreen = ({ route }: any) => {
    const { method } = route.params;

    const renderEquipment = (equipment: { [key: string]: any }) => {
        return Object.entries(equipment).map(([key, value]) => {
            if (typeof value === "object") {
                return (
                    <View key={key} style={styles.equipmentContainer}>
                        <Text style={styles.equipmentTitle}>{key}</Text>
                        {renderEquipment(value)}
                    </View>
                );
            }
            return (
                <View key={key} style={styles.equipmentContainer}>
                    <Text style={styles.equipmentTitle}>{key}</Text>
                    <Text>{value}</Text>
                </View>
            );
        });
    };

    return (
        <View style={styles.wrapper}>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{method.name}</Text>
                <Text style={styles.description}>{method.description}</Text>
                <Text style={styles.sectionTitle}>Utrustning:</Text>
                {renderEquipment(method.equipment)}
                {method.tips && (
                    <>
                        <Text style={styles.sectionTitle}>Tips:</Text>
                        {Object.entries(method.tips).map(([key, value]) => (
                            <View key={key} style={styles.equipmentContainer}>
                                <Text style={styles.equipmentTitle}>{key}</Text>
                                <Text>{value as string}</Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};


export default FishingMethodDetailScreen;
