import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";

const checkConnection = () => {
  const [connState, setConnState] = useState<NetInfoState>();

  useLayoutEffect(() => {
    NetInfo.fetch().then((state: NetInfoState) => {
      setConnState(state);
    });
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setConnState(state);
      if (!state.isConnected || !state.isInternetReachable) {
        Alert.alert("Sem internet!", "Você não está conectado á internet!");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [connState]);
};
export default checkConnection;
