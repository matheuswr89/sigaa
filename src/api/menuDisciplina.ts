import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

export const menuDisciplinaAction = async (
  json: any,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
) => {
  try {
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

    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf',
      payload,
      {
        headers,
        signal: controller.signal,
      },
    );
    // const response = await NativeModules.PythonModule.post(
    //   'https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf',
    //   JSON.stringify(payload),
    // );
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
          if (text?.includes('Nenhum')) {
            Alert.alert('Erro', text.replace('.', '!'));
          } else if (
            text?.includes('você ainda não foi cadastrado em nenhum grupo')
          ) {
            Alert.alert('Erro', text.replace('.', '!'));
          }
          text = html?.querySelector('ul.warning > li')?.textContent.trim();
          if (text?.includes('Ainda')) {
            Alert.alert('Erro', text.replace('.', '!'));
          }
        }
        await AsyncStorage.setItem('back', 'false');
      } else if (html?.querySelector('div#scroll-wrapper')) {
        setHtml(html);
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
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
