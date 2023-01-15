import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headers2} from '../utils';

export const acao = async (
  json: any,
  navigation: any,
  tipoAluno: string,
  setLoading: any,
  setHtml: any,
  controller: any,
) => {
  await AsyncStorage.setItem('back', 'false');

  if (json) {
    let payload: any = {
      turmaVirtual: json.turmaVirtual,
      'javax.faces.ViewState': json.javax,
      idTurma: json.id,
      form: json.form_acessarTurmaVirtual,
    };
    var str = JSON.stringify(payload);
    str = str.replace('"turmaVirtual"', '"' + json.turmaVirtual + '"');
    str = str.replace('"form"', '"' + json.form_acessarTurmaVirtual + '"');
    payload = JSON.parse(str);
    setLoading(true);
    const response = await axios(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
      {
        method: 'POST',
        headers: headers2,
        data: formBody(payload),
        signal: controller.signal,
      },
    );
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    setLoading(false);
    if (root.querySelector('div#conteudo')) {
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
};
