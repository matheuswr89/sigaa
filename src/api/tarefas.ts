import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import {Alert, Linking} from 'react-native';
import {formBody, headerTarefa} from '../utils';

export const baixaTarefa = async (
  json: any,
  form: string,
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
  payload[`${form}`] = form;
  let options = {
    method: 'POST',
    headers: headerTarefa,
    data: formBody(payload),
    signal: controller.signal,
  };
  setLoading(true);
  const response = await axios(
    'https://sig.ifsudestemg.edu.br/sigaa/ava/TarefaTurma/listar.jsf',
    options,
  );
  setLoading(false);
  const $ = cheerio.load(response.data);
  const root = parse($.html());
  if (root.querySelector('a[title="Baixar Arquivo Enviado"]')) {
    const link = root.querySelector('a[title="Baixar Arquivo Enviado"]')
      ?.attributes.href;
    navigation.goBack();
    Linking.openURL(
      link?.includes('https://')
        ? link
        : 'https://sig.ifsudestemg.edu.br' + link,
    );
  } else if (
    root
      .querySelector('fieldset > ul.form > li')
      ?.textContent.includes('Resposta:')
  ) {
    setHtml(root);
  } else {
    if ((await AsyncStorage.getItem('back')) === 'false') {
      navigation.goBack();
      Alert.alert(
        'Erro',
        'Erro ao carregar as tarefas, tente novamente mais tarde!',
      );
    }
    await AsyncStorage.setItem('back', 'false');
  }
};
