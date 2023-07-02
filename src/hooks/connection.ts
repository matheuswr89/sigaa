import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const checkConnection = () => {
  const [connState, setConnState] = useState<NetInfoState>();

  useEffect(() => {
    const fetchNetInfo = async () => {
      try {
        const state = await NetInfo.fetch();
        setConnState(state);
      } catch (error) {
        console.error('Error fetching net info:', error);
      }
    };

    const handleConnectivityChange = (state: NetInfoState) => {
      setConnState(state);
      if (!state.isConnected || !state.isInternetReachable) {
        Alert.alert('Sem internet!', 'Você não está conectado à internet!');
      }
    };

    fetchNetInfo();

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);
};

export default checkConnection;
