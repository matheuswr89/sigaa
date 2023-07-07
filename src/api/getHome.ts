import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { recordErrorFirebase } from '../utils/globalUtil';
import { getAllTurmas } from './getAllTurmas';

export const getHome = async (
  link: string | null,
  setHtml: any,
  setLoading: any,
  setTurmasAnteriores: any,
  navigation: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

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
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página, tente novamente mais tarde!');
    navigation.goBack();
  }
};
