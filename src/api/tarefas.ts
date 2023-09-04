import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

export const baixaTarefa = async (
  json: any,
  form: string,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  setLink: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    const payload = {
      ...parseJSON,
      'javax.faces.ViewState': javax,
    };
    payload[`${form}`] = form;

    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ava/TarefaTurma/listar.jsf',
      payload,
      {
        headers,
        signal: controller.signal,
      },
    );
    // const response = await NativeModules.PythonModule.post(
    //   'https://sig.ifsudestemg.edu.br/sigaa/ava/TarefaTurma/listar.jsf',
    //   JSON.stringify(payload),
    // );
    setLoading(false);
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    if (root.querySelector('a[title="Baixar Arquivo Enviado"]')) {
      const link = root.querySelector('a[title="Baixar Arquivo Enviado"]')
        ?.attributes.href;
      const linkNew = link?.includes('https://')
        ? link
        : 'https://sig.ifsudestemg.edu.br' + link;
      setLink(linkNew);
      navigation.goBack();
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
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
