import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

export const getDisciplinaAnteriores = async (
  disciplina: any,
  navigation: any,
  allTurmasParse: any,
  setLoading: any,
  setHtml: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    let payload: any = {
      formJID: allTurmasParse[0].nameForm,
      'javax.faces.ViewState': allTurmasParse[0].javax,
      ...disciplina.json,
    };
    payload[`${allTurmasParse[0].nameForm}`] = allTurmasParse[0].nameForm;

    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
      payload,
      {
        headers,
        signal: controller.signal,
      },
    );
    // const response = await NativeModules.PythonModule.post(
    //   'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
    //   JSON.stringify(payload),
    // );
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    setLoading(false);
    if (root.querySelector('div#barraDireita')) {
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Falha ao carregar os dados, tente novamente mais tarde!',
        );
      }
    }
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
