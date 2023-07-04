import { NavigationContainer, Theme } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'; // automatically switches bar style based on theme!
import { useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import checkConnection from './src/hooks/connection';
import {
  getFolderPermission,
  getPermissions,
} from './src/hooks/getPermissions';
import { useTheme } from './src/hooks/useTheme';
import { AppRoutes } from './src/routes/Router';

const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(252, 252, 252)',
    card: 'rgb(244, 244, 244)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(13, 17, 23)',
    card: 'rgb(22, 27, 34)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  const { getTheme, saveTheme } = useTheme();
  const [mode, setMode]: any = useState(false);
  NavigationBar.setBackgroundColorAsync(
    !mode ? DefaultTheme.colors.card : DarkTheme.colors.card,
  );

  const backgroundStyle = {
    backgroundColor: !mode
      ? DefaultTheme.colors.background
      : DarkTheme.colors.background,
  };

  checkConnection();

  useEffect(() => {
    changeTheme();
    getPermissions();
    getFolderPermission();
  }, []);

  async function changeTheme() {
    const theme = await getTheme();
    if (theme !== undefined) setMode(theme);
  }

  function handler(arg: any) {
    setMode(arg);
    saveTheme(arg);
  }

  DeviceEventEmitter.addListener('changeTheme', handler);
  return (
    <NavigationContainer theme={!mode ? DefaultTheme : DarkTheme}>
      <ExpoStatusBar
        style={mode ? 'light' : 'dark'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppRoutes />
    </NavigationContainer>
  );
}
