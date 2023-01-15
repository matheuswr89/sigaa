import notifee, {AndroidImportance} from '@notifee/react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import {Alert, PermissionsAndroid, useColorScheme} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {AppRoutes} from './screens/routers/Router';

export const useChannelId = () => {
  async function teste() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    return channelId;
  }
  const chanel = teste();
  return chanel;
};

const App: React.FC = () => {
  const [connState, setConnState] = React.useState<NetInfoState>();
  const scheme = useColorScheme();
  useChannelId();
  React.useEffect(() => {
    SplashScreen.hide();
    NetInfo.fetch().then((state: NetInfoState) => {
      setConnState(state);
    });
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setConnState(state);
      console.log('Tipo de conexão', state.type);
      console.log('Está conectado?', state.isConnected);
      if (!state.isConnected || !state.isInternetReachable) {
        Alert.alert('Sem internet!', 'Você não está conectado á internet!');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [connState]);
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default App;
