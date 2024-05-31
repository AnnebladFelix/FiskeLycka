import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
import MapScreen from "./src/screens/mapAndWaterScreens/MapScreen";
import FishSpeciesScreen from "./src/screens/fishScreens/FishSpeciesScreen";
import FishingMethodsScreen from "./src/screens/fishingSceen/FishingMethodsScreen";
import SignupScreen from "./src/screens/userScreens/SignupScreen";
import LoginScreen from "./src/screens/userScreens/LoginScreen";
import SearchFishingWaterScreen from "./src/screens/mapAndWaterScreens/SearchFishingWaterScreen";
import FishingWaterScreen from "./src/screens/mapAndWaterScreens/FishingWaterScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/components/AuthContext";
import UserScreen from "./src/screens/userScreens/UserScreen";
import AdminPage from "./src/screens/userScreens/AdminPage";
import FishDetailScreen from "./src/screens/fishScreens/FishDetailScreen";
import FishingMethodsDetailScreen from "./src/screens/fishingSceen/FishingMethodsDetailScreen";
import { mainStyles as styles } from "./src/styling/AppStyling";

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Login: undefined;
    UserScreen: undefined;
    Home: undefined;
};

export type UserScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UserScreen"
>;

export default function App() {
    return (
        <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Map"
                            component={MapScreen}
                            options={{ title: "Karta" }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ title: "Logga in" }}
                        />
                        <Stack.Screen
                            name="Signup"
                            component={SignupScreen}
                            options={{ title: "Skapa konto" }}
                        />
                        <Stack.Screen
                            name="FishSpecies"
                            component={FishSpeciesScreen}
                            options={{ title: "Fiskarter" }}
                        />
                        <Stack.Screen
                            name="FishingWater"
                            component={FishingWaterScreen}
                            options={{ title: "Fiskevatten" }}
                        />
                        <Stack.Screen
                            name="FishingMethods"
                            component={FishingMethodsScreen}
                            options={{ title: "Fiskemetoder" }}
                        />
                        <Stack.Screen
                            name="UserScreen"
                            component={UserScreen}
                            options={{ title: "Mina sidor" }}
                        />
                        <Stack.Screen
                            name="AdminPage"
                            component={AdminPage}
                            options={{ title: "Admin sida" }}
                        />
                        <Stack.Screen
                            name="FishDetail"
                            component={FishDetailScreen}
                            options={{ title: "Fiskart" }}
                        />
                        <Stack.Screen
                            name="SearchFishingWater"
                            component={SearchFishingWaterScreen}
                            options={{ title: "Sök fiskevatten" }}
                        />
                        <Stack.Screen
                            name="FishingMethod"
                            component={FishingMethodsDetailScreen}
                            options={{ title: "Fiskemetod" }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </AuthProvider>
    );
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const handleMenuClick = () => {
        console.log("Menu clicked");
    };

    const handleLogoClick = () => {
        console.log("Logo clicked");
    };

    const goToLoginScreen = () => {
        navigation.navigate("Login");
    };

    const goToMapScreen = () => {
        navigation.navigate("Map");
    };

    const goToFishSpeciesScreen = () => {
        navigation.navigate("FishSpecies");
    };

    const goToSearchFishingWaterScreen = () => {
        navigation.navigate("SearchFishingWater");
    };

    const goToFishingMethodsScreen = () => {
        navigation.navigate("FishingMethods");
    };

    return (
        <ImageBackground
            source={require("./assets/images/bakground1.jpg")}
            style={styles.background}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogoClick}>
                    <Image
                        source={require("./assets/images/Logo.png")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLoginScreen}>
                    <Image
                        source={require("./assets/images/login+fish.png")}
                        style={styles.loginLogo}
                    />
                </TouchableOpacity>
            </View>

            {/* Body */}
            <ScrollView style={styles.mainContent}>
                {/* Searchbar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Sök fiskevatten"
                        style={styles.searchInput}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.kartaButton]}
                        onPress={goToMapScreen}
                    >
                        <ImageBackground
                            source={require("./assets/images/karta.png")}
                            style={styles.buttonBackground}
                        >
                            <Text style={styles.buttonText}>Karta</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToSearchFishingWaterScreen}
                    >
                        <Text style={styles.buttonText}>Fiskevatten</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToFishSpeciesScreen}
                    >
                        <Text style={styles.buttonText}>Fiskarter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToFishingMethodsScreen}
                    >
                        <Text style={styles.buttonText}>Fiske Metoder</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.singleButton}>
                    <Text style={styles.buttonText}>Mina Fiskekort</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>@Copywrite 2024</Text>
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
};
