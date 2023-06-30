import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework } from "expo-file-system";
import { PermissionsAndroid } from "react-native";

const getPermissions = async () => {
  const isGranted = await AsyncStorage.getItem("permission");
  if (isGranted === null) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
    ]);
    if (
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] !== "granted" &&
      granted["android.permission.READ_EXTERNAL_STORAGE"] !== "granted" &&
      granted["android.permission.ACCESS_MEDIA_LOCATION"] !== "granted"
    ) {
      throw new Error();
    }
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }
    await AsyncStorage.setItem("local", permissions.directoryUri);
    await AsyncStorage.setItem("permission", "granted");
  }
};

export default getPermissions;
