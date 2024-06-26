import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthUserData } from "../interfaces/userInterfaces";

const AuthContext = createContext<
  | {
      user: AuthUserData | null;
      login: (userData: AuthUserData) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data from AsyncStorage when the component mounts
    const fetchUserData = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    <View>
      <ActivityIndicator animating={true} color="blue" size="large" />
    </View>;
  }

  const login = async (userData: AuthUserData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
