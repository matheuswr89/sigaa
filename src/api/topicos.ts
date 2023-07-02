import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

export const redirectTopico = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    const payload = {
      ...parseJSON,
      'javax.faces.ViewState': javax,
      form: 'form',
    };

    const response = await NativeModules.PythonModule.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/view.jsf',
      JSON.stringify(payload),
    );

    setLoading(false);

    const $ = cheerio.load(response);
    const root = parse($.html());

    if (root.querySelector('div.form-actions')) {
      setHtml(root.querySelector('#conteudo'));
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        navigation.goBack();
        Alert.alert(
          'Erro',
          'Erro ao carregar o tópico, tente novamente mais tarde!',
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } catch (e) {
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
