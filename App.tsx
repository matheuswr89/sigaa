import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import checkConnection from "./src/hooks/connection";
import getPermissions from "./src/hooks/getPermissions";
import { AppRoutes } from "./src/routes/Router";

export default function App() {
  const scheme = useColorScheme();
  checkConnection();
  getPermissions();

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
