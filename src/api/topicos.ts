import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headerTopico} from '../utils';

export const redirectTopico = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
) => {
  await AsyncStorage.setItem('back', 'false');

  const parseJSON = JSON.parse(json.replace(/'/g, '"'));
  const payload = {
    ...parseJSON,
    'javax.faces.ViewState': javax,
  };
  payload['form'] = 'form';
  let options = {
    method: 'POST',
    headers: headerTopico,
    data: formBody(payload),
    signal: controller.signal,
  };
  setLoading(true);
  const response = await axios(
    'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/view.jsf',
    options,
  );
  setLoading(false);
  const $ = cheerio.load(response.data);
  const root = parse($.html());
  if (root.querySelector('div.form-actions')) {
    setHtml(root.querySelector('#conteudo'));
  } else {
    if ((await AsyncStorage.getItem('back')) === 'false') {
      navigation.goBack();
      Alert.alert(
        'Erro',
        'Erro ao carregar os tópicos, tente novamente mais tarde!',
      );
    }
    await AsyncStorage.setItem('back', 'false');
  }
};
