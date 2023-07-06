import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { recordErrorFirebase } from '../utils/globalUtil';

export const getVinculos = async (setHtml: any, setLoading: any) => {
  try {
    const response = await NativeModules.PythonModule.get(
      'https://sig.ifsudestemg.edu.br/sigaa/vinculos.jsf',
    );
    const $ = cheerio.load(response);
    const turmas = parse($.html());
    setHtml(turmas);
    setLoading(false);
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
  }
};
