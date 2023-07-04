import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { getAllTurmas } from './getAllTurmas';

export const getHome = async (
  link: string | null,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any,
  navigation: any,
) => {
  try {
    setLoading(true);
    if (link) {
      const response = await NativeModules.PythonModule.get(
        'https://sig.ifsudestemg.edu.br/' + link,
      );

      const $ = cheerio.load(response);
      const turmas = parse($.html());
      setHtml(turmas);
      setLoading(false);
    }
    setLoading(false);
    await getAllTurmas(setTurmasAnteriores, setLoading, navigation);
  } catch (e: any) {
    await crashlytics().recordError(e);
    await crashlytics().setAttribute(
      'tela',
      `${await AsyncStorage.getItem('@SIGAA:Router')}`,
    );
    setLoading(false);
    Alert.alert('Erro ao acessar a página, tente novamente mais tarde!');
    navigation.goBack();
  }
};
