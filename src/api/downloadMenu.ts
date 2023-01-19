import axios from 'axios';
import * as cheerio from 'cheerio';
import {parse} from 'node-html-parser';
import {Alert, PermissionsAndroid, ToastAndroid} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {formBody, headers3} from '../utils';

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
  if (response.headers['content-disposition']) {
    const file = response.headers['content-disposition']
      .split('filename=')[1]
      .replace(/"/g, '');

    const dir = RNFS.DownloadDirectoryPath + '/';

    await RNFS.writeFile(
      dir + file,
      Buffer.from(response.data, 'binary').toString('base64'),
      'base64',
    )
      .then(() => {
        ToastAndroid.showWithGravity(
          'Arquivo baixado com sucesso! Localização: ' + dir,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        const mimetype = response.headers['content-type'];
        Alert.alert(
          'Arquivo baixado com suceso!',
          'Deseja abrir ou compartilhar ele?',
          [
            {
              text: 'Cancelar',
            },
            {
              text: 'Abrir',
              onPress: () =>
                ReactNativeBlobUtil.android.actionViewIntent(
                  `${dir}${file}`,
                  mimetype,
                ),
            },
            {
              text: 'Compartilhar',
              onPress: () =>
                Share.open({
                  title: `Compartilhar arquivo ${file}`,
                  message: 'Estou compartilhando esse arquivo com você!',
                  url: `file:///${dir}${file}`,
                  subject: 'Report',
                }),
            },
          ],
        );
      })
      .catch(err => {
        Alert.alert(
          'Erro',
          'Erro ao baixar o arquivo, tente novamente mais tarde.',
        );
      });
  } else {
    const $ = cheerio.load(Buffer.from(response.data, 'binary').toString());
    const turmas = parse($.html());
    if (turmas.querySelector('ul.erros')) {
      Alert.alert('Erro', turmas.querySelector('ul.erros')?.textContent.trim());
    } else {
      Alert.alert(
        'Erro',
        'Erro ao baixar o arquivo, tente novamente mais tarde.',
      );
    }
  }
};
