import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { recordErrorFirebase } from '../utils/globalUtil';

export const redirectForum = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  tipo?: number,
  controller?: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    let payload: any = {};
    const url =
      tipo === 1
        ? 'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf'
        : 'https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf';
    if (tipo === 1) {
      payload = {
        ...parseJSON,
        'javax.faces.ViewState': javax,
        formAva: 'formAva',
        'formAva:idTopicoSelecionado': 0,
      };
    } else {
      payload = {
        ...parseJSON,
        'javax.faces.ViewState': javax,
        form: 'form',
      };
    }

    const response = await NativeModules.PythonModule.post(
      url,
      JSON.stringify(payload),
    );
    setLoading(false);
    const $ = cheerio.load(response);
    const root = parse($.html());
    if (root.querySelector('div.infoAltRem')) {
      setHtml(root.querySelector('#conteudo'));
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Erro ao carregar os fóruns, tente novamente mais tarde!',
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
