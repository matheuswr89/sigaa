import { PermissionsAndroid } from "react-native";

const getPermissions = async () => {
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
};

export default getPermissions;
