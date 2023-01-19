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

const App: React.FC = () => {
  const [connState, setConnState] = React.useState<NetInfoState>();
  const scheme = useColorScheme();
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
