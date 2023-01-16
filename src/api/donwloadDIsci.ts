import axios from 'axios';
import {Alert, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
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
  const file = response.headers['content-disposition']
    .split('"')[1]
    .replace(/"/g, '');
  await ReactNativeBlobUtil.fs
    .writeFile(
      '/storage/emulated/0/Android/media/com.sigaa/SIGAA/' + file,
      Buffer.from(response.data, 'binary').toString('base64'),
      'base64',
    )
    .then(() => {
      ToastAndroid.showWithGravity(
        'Arquivo baixado com sucesso! Localização: /storage/emulated/0/Android/media/com.sigaa/SIGAA',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      const mimetype = response.headers['content-type'];
      Alert.alert(
        'Arquivo baixado com suceso!',
        'Deseja abrir ou localizar ele?',
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Abrir',
            onPress: () =>
              ReactNativeBlobUtil.android.actionViewIntent(
                `/storage/emulated/0/Android/media/com.sigaa/SIGAA/${file}`,
                mimetype,
              ),
          },
          {
            text: 'Compartilhar',
            onPress: () =>
              Share.open({
                title: `Compartilhar arquivo ${file}`,
                message: 'Estou compartilhando esse arquivo com você!',
                url: `file:///storage/emulated/0/Android/media/com.sigaa/SIGAA/${file}`,
                subject: 'Report',
              }),
          },
        ],
      );
      onDisplayNotification(
        file.replace('/', ''),
        '/storage/emulated/0/Android/media/com.sigaa/SIGAA/',
        mimetype,
      );
    })
    .catch(() => {
      Alert.alert(
        'Erro',
        'Erro ao baixar o arquivo, tente novamente mais tarde.',
      );
    });
};
