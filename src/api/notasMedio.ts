import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

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

    const response = await NativeModules.PythonModule.post(
      'https://sig.ifsudestemg.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf',
      JSON.stringify(payload),
    );
    setLoading(false);
    const $ = cheerio.load(response);
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
  } catch (e) {
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
