import axios from 'axios';
import {Alert, PermissionsAndroid, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
import {formBody, headers3, onDisplayNotification} from '../utils';

export const downloadMenu = async (payload: any, controller: any) => {
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
    'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf';
  const response = await axios(url, {
    headers: headers3,
    data: formBody(payload),
    method: 'POST',
    responseType: 'arraybuffer',
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    transitional: {
      silentJSONParsing: false,
      forcedJSONParsing: false,
    },
    signal: controller.signal,
  });

  console.log(
    response.headers['content-disposition']
      .split('filename=')[1]
      .replace(/"/g, ''),
  );
  const file = response.headers['content-disposition']
    .split('filename=')[1]
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
