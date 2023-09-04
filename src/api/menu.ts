import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse, { HTMLElement } from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';
export const redirectScreen = async (
  name: string,
  code: HTMLElement | null | undefined,
  setLoading: any,
  setHtml: any,
  tipoAluno?: string,
  navigation?: any,
  controller?: any,
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    if (name && code) {
      let action = code.querySelector('div')?.id || '';

      if (name === 'Consultar Notas') {
        if (tipoAluno === 'medio') {
          action += ':A]#{ portalDiscente.emitirBoletim }';
        } else {
          action += ':A]#{ relatorioNotasAluno.gerarRelatorio }';
        }
      } else if (name === 'MenuDisciplinaScreen') {
        action += ':A]#{ portalDiscente.atestadoMatricula }';
      }

      const id = code.querySelector("input[name='id']")?.attributes.value || '';
      const viewState =
        code.querySelector("input[name='javax.faces.ViewState']")?.attributes
          .value || '';

      const payload = {
        'menu:form_menu_discente': 'menu:form_menu_discente',
        id,
        jscook_action: action,
        'javax.faces.ViewState': viewState,
      };

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

      if (root.querySelector('ul.erros')) {
        if ((await AsyncStorage.getItem('back')) === 'false') {
          Alert.alert(
            'Erro',
            root.querySelector('ul.erros')?.textContent?.trim(),
          );
          navigation.goBack();
        }
        await AsyncStorage.setItem('back', 'false');
      } else if (
        root.querySelector('div#relatorio-container') ||
        root.querySelectorAll('table.tabelaRelatorio').length > 0 ||
        root.querySelector('form[id="formInfoDiscente"]')
      ) {
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
    Alert.alert('Erro ao acessar a página, tente novamente mais tarde!');
    navigation.goBack();
  }
};
