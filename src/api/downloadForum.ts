import notifee from '@notifee/react-native';
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {
  foregroundNoti,
  formBody,
  headerTarefa,
  onDisplayNotification,
} from '../utils';

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
  foregroundNoti();
  notifee.registerForegroundService(() => {
    return new Promise(async () => {
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
      const file =
        '/' +
        response.headers['content-disposition']
          .split('filename=')[1]
          .replace(/"/g, '');
      await ReactNativeBlobUtil.fs.writeFile(
        ReactNativeBlobUtil.fs.dirs.DownloadDir + file,
        Buffer.from(response.data, 'binary').toString('base64'),
        'base64',
      );

      await notifee.stopForegroundService();
      onDisplayNotification(
        file.replace('/', ''),
        ReactNativeBlobUtil.fs.dirs.DownloadDir,
        response.headers['content-type'],
      );
    });
  });
};
