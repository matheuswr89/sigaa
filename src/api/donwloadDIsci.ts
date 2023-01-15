import notifee from '@notifee/react-native';
import axios from 'axios';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {foregroundNoti, formBodyJson, onDisplayNotification} from '../utils';

export const downloadDisci = async (json: any, javax: string) => {
  const payload = {
    ...JSON.parse(json.link.replace(/'/g, '"')),
    'javax.faces.ViewState': javax,
    formAva: 'formAva',
    'formAva:idTopicoSelecionado': '0',
  };
  foregroundNoti();
  notifee.registerForegroundService(() => {
    return new Promise(async () => {
      const url =
        'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf?' +
        formBodyJson(payload);

      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        transitional: {
          silentJSONParsing: false,
          forcedJSONParsing: false,
        },
      });
      const file = '/' + response.headers['content-disposition'].split('"')[1];
      await ReactNativeBlobUtil.fs.writeFile(
        ReactNativeBlobUtil.fs.dirs.DownloadDir + file,
        Buffer.from(response.data, 'binary').toString('base64'),
        'base64',
      );
      onDisplayNotification(
        file.replace('/', ''),
        ReactNativeBlobUtil.fs.dirs.DownloadDir,
        response.headers['content-type'],
      );
    });
  });
};
