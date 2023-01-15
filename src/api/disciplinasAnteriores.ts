import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {parse} from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headers4} from '../utils';

export const navegaParaDisciplina = async (
  disciplina: any,
  navigation: any,
  tipoAluno: string,
  allTurmasParse: any,
  setLoading: any,
  setHtml: any,
  controller: any,
) => {
  await AsyncStorage.setItem('back', 'false');

  let payload: any = {
    formJID: allTurmasParse[0].nameForm,
    'javax.faces.ViewState': allTurmasParse[0].javax,
    ...disciplina.json,
  };

  var str = JSON.stringify(payload);
  str = str.replace('"formJID"', '"' + allTurmasParse[0].nameForm + '"');
  payload = JSON.parse(str);

  setLoading(true);
  const response = await axios(
    'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
    {
      method: 'POST',
      headers: headers4,
      data: formBody(payload),
      signal: controller.signal,
    },
  );
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
};
