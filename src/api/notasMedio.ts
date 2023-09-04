import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

export const notasMedioAction = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    let payload = {
      form: 'form',
      'javax.faces.ViewState': javax,
      ...json.json,
    };
    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf',
      payload,
      {
        headers,
        signal: controller.signal,
      },
    );
    // const response = await NativeModules.PythonModule.post(
    //   'https://sig.ifsudestemg.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf',
    //   JSON.stringify(payload),
    // );
    setLoading(false);
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    if (root.querySelector('div#relatorio')) {
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
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
