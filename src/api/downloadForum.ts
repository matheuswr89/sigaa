import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { Buffer } from 'buffer';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules, ToastAndroid } from 'react-native';
import { getPermissions } from '../hooks/getPermissions';
import { replaceHeader } from '../utils/globalUtil';
import { saveFile } from './files';

export const downloadForum = async (payload: any) => {
  try {
    getPermissions();
    ToastAndroid.showWithGravity(
      'Baixando o arquivo, agurade um momento...',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    const response = String(
      await NativeModules.PythonModule.download(
        'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf',
        JSON.stringify(payload),
      ),
    );
    const regex = /'content': \[(.*?)\], 'headers': \{(.*?)\}/;
    const matches = response.match(regex);
    if (matches) {
      const headersFormated = `{${matches[2].replace(/'/gm, '"')}}`.replace(
        /"(att|inline;|form-data;).*""/gm,
        replaceHeader,
      );
      const headers = JSON.parse(headersFormated);
      const content = JSON.parse(`{"contents": [${matches[1]}]}`);

      const file =
        headers['Content-Disposition'] ||
        headers['Content-disposition'] ||
        headers['content-disposition'];
      let type = headers['Content-Type'];
      if (type === undefined) type = 'application/octet-stream';

      if (file) {
        await saveFile(
          file.substring(file.indexOf('=') + 1),
          type,
          content.contents,
        );
      } else {
        const $ = cheerio.load(
          Buffer.from(content.contents, 'binary').toString(),
        );
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
    } else {
      Alert.alert(
        'Erro',
        'Erro ao baixar o arquivo, tente novamente mais tarde.',
      );
    }
  } catch (e: any) {
    await crashlytics().recordError(e);
    await crashlytics().setAttribute(
      'tela',
      `${await AsyncStorage.getItem('@SIGAA:Router')}-downloadForum`,
    );
    Alert.alert(
      'Erro ao baixar o arquivo!',
      'Provavelmente ele não está mais disponivel nos servidores do SIGAA!',
    );
  }
};
