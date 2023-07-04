import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { NativeModules } from 'react-native';

export const getEnquete = async (
  json: any,
  setLoading: any,
  setHtml: any,
  controller: any,
  tipo: number,
) => {
  try {
    if (json) {
      const url =
        tipo === 1
          ? 'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf'
          : 'https://sig.ifsudestemg.edu.br/sigaa/ava/Enquete/listar.jsf';
      const response = await NativeModules.PythonModule.post(
        url,
        JSON.stringify(json),
      );

      const $ = cheerio.load(response);
      const root = parse($.html());
      setLoading(false);
      if (root.querySelector('div#conteudo')) {
        setHtml(root);
      } else {
      }
    }
  } catch (e: any) {
    await crashlytics().recordError(e);
    await crashlytics().setAttribute(
      'tela',
      `${await AsyncStorage.getItem('@SIGAA:Router')}-enquete`,
    );
  }
};
