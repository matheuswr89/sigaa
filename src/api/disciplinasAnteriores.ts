import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

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

    const response = await NativeModules.PythonModule.post(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/turmas.jsf',
      JSON.stringify(payload),
    );
    const $ = cheerio.load(response);
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
  } catch (e) {
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
