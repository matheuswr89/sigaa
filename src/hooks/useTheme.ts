import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@sigaa:THEME";

export const useTheme = () => {
  const saveTheme = async (theme: any) => {
    await AsyncStorage.setItem(THEME_KEY, theme + "");
  };

  const getTheme = async (): Promise<any> => {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    if (theme !== null) {
      return theme === "false" ? false : true;
    }
    return undefined;
  };

  return {
    getTheme,
    saveTheme,
  };
};
