import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headers2, headerTarefa} from '../utils';

export const redirectForum = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  tipo?: number,
  controller?: any,
) => {
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
  let options = {
    method: 'POST',
    headers: tipo === 1 ? headers2 : headerTarefa,
    data: formBody(payload),
    signal: controller.signal,
  };
  setLoading(true);
  const response = await axios(url, options);
  setLoading(false);
  const $ = cheerio.load(response.data);
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
};
