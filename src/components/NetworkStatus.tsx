import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    return null;
  }

  return <Text>Inget nätverk hittades</Text>;
};

export default NetworkStatus;
