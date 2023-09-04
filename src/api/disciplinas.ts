import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

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

      const response = await axios.post(
        'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
        payload,
        {
          headers,
          signal: controller.signal,
        },
      );
      // const response = await NativeModules.PythonModule.post(
      //   'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
      //   JSON.stringify(payload),
      // );
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
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
