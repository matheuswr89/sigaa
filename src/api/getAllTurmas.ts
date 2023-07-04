import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

export const getAllTurmas = async (
  setTurmasAnteriores: any,
  setLoading: any,
  navigation: any,
) => {
  try {
    setLoading(true);
    const response = await NativeModules.PythonModule.get(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
    );
    const $ = cheerio.load(response);
    const turmas = parse($.html());
    setTurmasAnteriores(turmas);
    setLoading(false);
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
