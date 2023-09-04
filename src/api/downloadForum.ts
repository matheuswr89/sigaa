import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert } from 'react-native';
import { getPermissions } from '../hooks/getPermissions';
import { fechaModal, headers, recordErrorFirebase } from '../utils/globalUtil';
import { saveFile } from './files';

export const downloadForum = async (
  payload: any,
  open: any,
  modalVisible: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    getPermissions();

    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf',
      payload,
      {
        headers,
        responseType: 'arraybuffer',
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        transitional: {
          silentJSONParsing: false,
          forcedJSONParsing: false,
        },
      },
    );
    // const response = String(
    //   await NativeModules.PythonModule.download(
    //     'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf',
    //     JSON.stringify(payload),
    //   ),
    // );
    const file =
      response.headers['Content-Disposition'] ||
      response.headers['Content-disposition'] ||
      response.headers['content-disposition'];
    let type =
      (response.headers['Content-Type'] || response.headers['content-type']) +
      '';
    if (type === undefined) type = 'application/octet-stream';
    if (file) {
      if ((await AsyncStorage.getItem('back')) === 'false')
        await saveFile(
          file.substring(file.indexOf('=') + 1),
          type,
          response.data,
          open,
          modalVisible,
          controller,
        );
    } else {
      fechaModal(open, modalVisible, controller);
      const $ = cheerio.load(Buffer.from(response.data, 'binary').toString());
      const turmas = parse($.html());
      if (turmas.querySelector('ul.erros')) {
        Alert.alert(
          'Erro',
          turmas.querySelector('ul.erros')?.textContent.trim(),
        );
      } else {
        Alert.alert(
          'Erro',
          'Erro ao baixar o arquivo, tente novamente mais tarde.',
        );
      }
    }
  } catch (e: any) {
    fechaModal(open, modalVisible, controller);
    recordErrorFirebase(e, '-downloadForum');
    Alert.alert(
      'Erro ao baixar o arquivo!',
      'Provavelmente ele não está mais disponivel nos servidores do SIGAA!',
    );
  }
};
