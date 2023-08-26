import crashlytics from '@react-native-firebase/crashlytics';
import { NavigationContainer, Theme } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'; // automatically switches bar style based on theme!
import { useEffect, useState } from 'react';
import { Appearance, DeviceEventEmitter } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorHandler } from './src/components/ErrorComponent';
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
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 59, 48)',
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(16, 16, 16)',
    card: 'rgb(16, 16, 16)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(16, 16, 16)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  const { getTheme, saveTheme } = useTheme();
  const [mode, setMode]: any = useState(
    () => Appearance.getColorScheme() === 'dark',
  );
  NavigationBar.setBackgroundColorAsync(
    !mode ? DefaultTheme.colors.background : DarkTheme.colors.background,
  );
  const backgroundStyle = {
    backgroundColor: !mode
      ? DefaultTheme.colors.background
      : DarkTheme.colors.background,
  };

  checkConnection();
  crashlytics().setCrashlyticsCollectionEnabled(true);
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
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}
      >
        <ErrorHandler>
          <ExpoStatusBar
            style={mode ? 'light' : 'dark'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <AppRoutes />
        </ErrorHandler>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
