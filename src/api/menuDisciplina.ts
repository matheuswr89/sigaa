import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headers3, headers5} from '../utils';

export const menuDisciplinaAction = async (
  json: any,
  setLoading: any,
  navigation: any,
  tipoAluno: string,
  setHtml: any,
  setTipoAcao: any,
  setTipoAcao1: any,
  controller: any,
) => {
  await AsyncStorage.setItem('back', 'false');

  let payload;
  if (json.id > 20) {
    const form1 = json.formMenu1;
    const form2 = json.formMenu2;
    payload = {
      formMenu: json.formMenu,
      form1: form1,
      'javax.faces.ViewState': json.javax,
      form2: form2,
    };
    payload = JSON.parse(
      JSON.stringify(payload)
        .replace('form1', json.formMenu0)
        .replace('form2', form2),
    );
  } else {
    payload = json.requests;
  }
  let options = {
    method: 'POST',
    headers: json.id > 20 ? headers3 : headers5,
    data: formBody(payload),
    signal: controller.signal,
  };
  setLoading(true);
  const response = await axios(
    'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf',
    options,
  );
  setLoading(false);
  const $ = cheerio.load(response.data);
  const root = parse($.html());

  if (response.data.includes('<div id="conteudo"')) {
    setLoading(false);
    const html = root.querySelector('#conteudo');
    if (
      html?.querySelector('p.empty-listing') ||
      html?.querySelector('ul.warning')
    ) {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        let text = html?.querySelector('p.empty-listing')?.textContent.trim();
        if (text?.includes('Nenhum fórum foi encontrado.')) {
          Alert.alert('Erro', 'Nenhum fórum foi encontrado!');
        } else if (text?.includes('Nenhum item foi encontrado')) {
          Alert.alert('Erro', 'Nenhuma tarefa foi encontrada!');
        } else if (
          text?.includes('você ainda não foi cadastrado em nenhum grupo')
        ) {
          Alert.alert(
            'Erro',
            'Caro aluno, você ainda não foi cadastrado em nenhum grupo!',
          );
        }
        text = html?.querySelector('ul.warning > li')?.textContent.trim();
        if (text?.includes('Ainda não foram lançadas notas.')) {
          Alert.alert('Erro', 'Ainda não foram lançadas notas!');
        }
      }
      await AsyncStorage.setItem('back', 'false');
    } else if (html?.querySelector('div#scroll-wrapper')) {
      setHtml(html);
      setTipoAcao('nota');
      setTipoAcao1('prof');
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Falha ao carregar os dados, tente novamente mais tarde!',
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } else {
    if (
      root.querySelector('div#relatorio-container') ||
      root.querySelector('div.notas')
    ) {
      setHtml(root);
      setTipoAcao1('none');
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Falha ao carregar os dados, tente novamente mais tarde!',
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  }
};