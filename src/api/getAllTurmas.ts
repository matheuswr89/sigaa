import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { recordErrorFirebase } from '../utils/globalUtil';

export const getAllTurmas = async (
  setTurmasAnteriores: any,
  setLoading: any,
  navigation: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    setLoading(true);
    const response = await NativeModules.PythonModule.get(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
    );
    const $ = cheerio.load(response);
    const turmas = parse($.html());
    setTurmasAnteriores(turmas);
    setLoading(false);
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página, tente novamente mais tarde!');
    navigation.goBack();
  }
};
