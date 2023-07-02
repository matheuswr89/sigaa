import AsyncStorage from '@react-native-async-storage/async-storage';

import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import {
  EncodingType,
  StorageAccessFramework,
  writeAsStringAsync,
} from 'expo-file-system';

import { startActivityAsync } from 'expo-intent-launcher';
import { shareAsync } from 'expo-sharing';
import { Alert, Platform, ToastAndroid } from 'react-native';

const ensureDirAsync: any = async (dir: any, intermediates = true) => {
  const props = await FileSystem.getInfoAsync(dir);
  if (props.exists && props.isDirectory) {
    return props;
  }
  let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates });
  return await ensureDirAsync(dir, intermediates);
};

export const saveFile = async (file: string, type: string, data: string) => {
  ToastAndroid.showWithGravity(
    'Salvando o arquivo...',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
  );
  let local: any = await AsyncStorage.getItem('@sigaa:LOCAL');
  if (Platform.OS === 'android') {
    ensureDirAsync(local);
  }

  try {
    const uri = await StorageAccessFramework.createFileAsync(local, file, type);
    await writeAsStringAsync(
      uri,
      Buffer.from(data, 'binary').toString('base64'),
      {
        encoding: EncodingType.Base64,
      },
    );
    ToastAndroid.showWithGravity(
      'Arquivo salvo com sucesso!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    Alert.alert('Arquivo baixado com sucesso!', 'Deseja abrir o arquivo?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Abrir',
        onPress: () => openFile(uri, type),
      },
    ]);
  } catch (error) {
    Alert.alert(
      'Erro',
      'Erro ao baixar o arquivo, tente novamente mais tarde. (saveFile) ' +
        local,
    );
  }
};
const openFile = async (fileUri: string, type: string) => {
  try {
    if (Platform.OS === 'android') {
      await startActivityAsync('android.intent.action.VIEW', {
        data: fileUri,
        flags: 1,
      });
    } else {
      await shareAsync(fileUri, {
        UTI: type,
        mimeType: type,
      });
    }
  } catch (error) {
    Alert.alert(
      'Erro',
      'Não tem um aplicativo disponível para abrir esse arquivo.',
    );
  }
};
