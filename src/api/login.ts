import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {parse} from 'node-html-parser';
import {Alert} from 'react-native';
import {formBody, headers} from '../utils';

interface Payload {
  'user.login': string;
  'user.senha': string;
}

export const login = async (
  user: string,
  senha: string,
  navigation: any,
  setLoading: any,
  setTurmasAnteriores: any,
  setHtml: any,
  controller: any,
) => {
  await AsyncStorage.setItem('back', 'false');

  if (user && senha) {
    await AsyncStorage.multiSet([
      ['user', user],
      ['senha', senha],
    ]);
    const payload: Payload = {
      'user.login': user,
      'user.senha': senha,
    };
    setLoading(true);
    const result = await axios(
      'https://sig.ifsudestemg.edu.br/sigaa/logar.do?dispatch=logOn',
      {
        method: 'POST',
        headers: headers,
        data: formBody(payload),
        signal: controller.signal,
      },
    );
    const response = await axios.get(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
    );
    const $ = cheerio.load(response.data);
    const turmas = parse($.html());
    const $1 = cheerio.load(result.data);
    const root = parse($1.html());
    setLoading(false);
    if (
      root.querySelector('p.usuario')?.attributes.class !== undefined &&
      turmas.querySelector('table.listagem') !== undefined
    ) {
      setTurmasAnteriores(turmas);
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Erro ao fazer o login, confirme os dados e tente novamente!',
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } else {
    if ((await AsyncStorage.getItem('back')) === 'false') {
      navigation.goBack();
      Alert.alert('Erro', 'Os campos não podem ficar vazio!');
    }
    await AsyncStorage.setItem('back', 'false');
  }
};
