import axios from 'axios';
import {ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {formBodyJson, onDisplayNotification} from '../utils';

export const downloadDisci = async (json: any, javax: string) => {
  const payload = {
    ...JSON.parse(json.link.replace(/'/g, '"')),
    'javax.faces.ViewState': javax,
    formAva: 'formAva',
    'formAva:idTopicoSelecionado': '0',
  };
  const url =
    'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf?' +
    formBodyJson(payload);
  ToastAndroid.showWithGravity(
    'Baixando o arquivo, agurade um momento...',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    transitional: {
      silentJSONParsing: false,
      forcedJSONParsing: false,
    },
  });
  const file = response.headers['content-disposition'].split('"')[1];
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
