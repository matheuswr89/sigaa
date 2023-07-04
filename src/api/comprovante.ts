import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import * as cheerio from 'cheerio';
import parse, { HTMLElement } from 'node-html-parser';
import { Alert, NativeModules } from 'react-native';

export const comprovante = async (
  code: HTMLElement | null | undefined,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    let action = code?.querySelector('div')?.id;
    action += ':A]#{ matriculaGraduacao.verComprovanteSolicitacoes}';

    const payload = {
      'menu:form_menu_discente': 'menu:form_menu_discente',
      id: code?.querySelector("input[name='id']")?.attributes.value,
      jscook_action: action,
      'javax.faces.ViewState': code?.querySelector(
        "input[name='javax.faces.ViewState']",
      )?.attributes.value,
    };

    const result = await NativeModules.PythonModule.post(
      'https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf',
      JSON.stringify(payload),
    );
    const $1 = cheerio.load(result);
    const root1 = parse($1.html());
    if (!root1.querySelector('ul.erros')) {
      const response = await NativeModules.PythonModule.get(
        'https://sig.ifsudestemg.edu.br/sigaa/graduacao/matricula/comprovante_solicitacoes.jsf',
      );
      setLoading(false);
      const $ = cheerio.load(response);
      const root = parse($.html());
      if (root.querySelectorAll('table').length === 4) {
        setHtml(root);
      } else {
        if ((await AsyncStorage.getItem('back')) === 'false') {
          navigation.goBack();
          Alert.alert(
            'Erro',
            'Erro ao carregar os dados do comprovante, tente novamente mais tarde!',
          );
        }
        await AsyncStorage.setItem('back', 'false');
      }
    } else {
      if ((await AsyncStorage.getItem('back')) === 'false') {
        Alert.alert(
          'Erro',
          root1.querySelector('ul.erros')?.textContent.trim(),
        );
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } catch (e: any) {
    await crashlytics().recordError(e);
    await crashlytics().setAttribute(
      'tela',
      `${await AsyncStorage.getItem('@SIGAA:Router')}`,
    );
    Alert.alert('Erro ao acessar a página!', 'Tente novamente mais tarde!');
    navigation.goBack();
  }
};
