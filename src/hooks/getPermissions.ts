import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAccessFramework } from 'expo-file-system';
import { PermissionsAndroid } from 'react-native';

const getPermissions = async () => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  ];

  const granted = await PermissionsAndroid.requestMultiple(permissions);

  const isAllPermissionsGranted = permissions.every(
    permission => granted[permission] === PermissionsAndroid.RESULTS.GRANTED,
  );

  if (!isAllPermissionsGranted) {
    throw new Error();
  }
};
const getFolderPermission = async () => {
  const local = await AsyncStorage.getItem('@sigaa:LOCAL');

  if (!local) {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      return;
    }

    await AsyncStorage.setItem('@sigaa:LOCAL', permissions.directoryUri);
  }
};
export { getPermissions, getFolderPermission };
