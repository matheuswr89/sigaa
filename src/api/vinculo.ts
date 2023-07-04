import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

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
    await crashlytics().recordError(e);
    await crashlytics().setAttribute(
      'tela',
      `${await AsyncStorage.getItem('@SIGAA:Router')}`,
    );
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
  }
};
