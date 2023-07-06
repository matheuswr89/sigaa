import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';
import { recordErrorFirebase } from '../utils/globalUtil';

export const getDisciplina = async (
  json: any,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    if (json) {
      let payload: any = {
        'javax.faces.ViewState': json.javax,
        idTurma: json.id,
      };
      payload[`${json.turmaVirtual}`] = json.turmaVirtual;
      payload[`${json.form_acessarTurmaVirtual}`] =
        json.form_acessarTurmaVirtual;

      const response = await NativeModules.PythonModule.post(
        'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
        JSON.stringify(payload),
      );
      const $ = cheerio.load(response);
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
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
