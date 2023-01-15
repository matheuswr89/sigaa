import axios from 'axios';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {formBody, headerTarefa, onDisplayNotification} from '../utils';

export const downloadForum = async (payload: any) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Permission to save file into the file storage',
      message:
        'The app needs access to your file storage so you can download the file',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error();
  }
  ToastAndroid.showWithGravity(
    'Baixando o arquivo, agurade um momento...',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  const url =
    'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf';
  const response = await axios(url, {
    headers: headerTarefa,
    data: formBody(payload),
    method: 'POST',
    responseType: 'arraybuffer',
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    transitional: {
      silentJSONParsing: false,
      forcedJSONParsing: false,
    },
  });
  const file = response.headers['content-disposition']
    .split('filename=')[1]
    .replace(/"/g, '');
  await ReactNativeBlobUtil.fs.writeFile(
    '/storage/emulated/0/Android/media/com.sigaa/SIGAA/' + file,
    Buffer.from(response.data, 'binary').toString('base64'),
    'base64',
  );
  ToastAndroid.showWithGravity(
    'Arquivo baixado com sucesso! Localização: /storage/emulated/0/Android/media/com.sigaa/SIGAA',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  onDisplayNotification(
    file.replace('/', ''),
    '/storage/emulated/0/Android/media/com.sigaa/SIGAA/',
    response.headers['content-type'],
  );
};
