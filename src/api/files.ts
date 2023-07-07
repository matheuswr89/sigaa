import AsyncStorage from '@react-native-async-storage/async-storage';

import { Buffer } from 'buffer';
import {
  EncodingType,
  StorageAccessFramework,
  writeAsStringAsync,
} from 'expo-file-system';

import { startActivityAsync } from 'expo-intent-launcher';
import { shareAsync } from 'expo-sharing';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { fechaModal, recordErrorFirebase } from '../utils/globalUtil';

export const saveFile = async (
  file: string,
  type: string,
  data: string,
  open: any,
  modalVisible: any,
) => {
  ToastAndroid.showWithGravity(
    'Salvando o arquivo...',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
  );
  let local: any = await AsyncStorage.getItem('@sigaa:LOCAL');

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
    fechaModal(open, modalVisible);
    Alert.alert('Arquivo baixado com sucesso!', 'Deseja abrir o arquivo?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Abrir',
        onPress: () => openFile(uri, type),
      },
    ]);
  } catch (e: any) {
    fechaModal(open, modalVisible);
    recordErrorFirebase(e, '-salvarArquivo');

    Alert.alert(
      'Erro',
      'Erro ao baixar o arquivo, tente novamente mais tarde.',
    );
  }
};
const openFile = async (fileUri: string, type: string) => {
  try {
    if (Platform.OS === 'android') {
      await startActivityAsync('android.intent.action.VIEW', {
        data: fileUri,
        flags: 1,
        type,
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
