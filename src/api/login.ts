import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as cheerio from 'cheerio';
import parse from 'node-html-parser';
import { Alert } from 'react-native';
import { headers, recordErrorFirebase } from '../utils/globalUtil';

interface Payload {
  'user.login': string;
  'user.senha': string;
}

export const login = async (
  user: string,
  senha: string,
  {
    navigation,
    setLoading,
    setHtml,
    controller,
    tipo,
  }: {
    navigation: any;
    setLoading: any;
    setHtml: any;
    controller: any;
    tipo: number;
  },
) => {
  try {
    await AsyncStorage.setItem('back', 'false');

    if (!user || !senha) {
      setLoading(false);
      const backValue = await AsyncStorage.getItem('back');
      if (backValue === 'false') {
        navigation.goBack();
        Alert.alert('Erro', 'Os campos não podem ficar vazios!');
      }
      await AsyncStorage.setItem('back', 'false');
      return;
    }

    await AsyncStorage.setItem('@sigaa:USER', user);
    await AsyncStorage.setItem('@sigaa:SENHA', senha);

    const payload: Payload = {
      'user.login': user,
      'user.senha': senha,
    };
    const response = await axios.post(
      'https://sig.ifsudestemg.edu.br/sigaa/logar.do?dispatch=logOn',
      payload,
      {
        headers,
        signal: controller.signal,
      },
    );
    // const response = await NativeModules.PythonModule.post(
    //   'https://sig.ifsudestemg.edu.br/sigaa/logar.do?dispatch=logOn',
    //   JSON.stringify(payload),
    // );

    const $1 = cheerio.load(response.data);
    const root = parse($1.html());
    const link = await AsyncStorage.getItem('vinculo');

    if (tipo === 1) {
      setLoading(false);
      navigation.replace('HomeScreen', { navigation, link, tipo: 1 });
      return;
    }

    if (root.querySelector('p.usuario')?.attributes.class !== undefined) {
      setHtml(root);
      setLoading(false);
      return root;
    } else {
      setLoading(false);
      const backValue = await AsyncStorage.getItem('back');
      if (backValue === 'false') {
        Alert.alert(
          'Erro',
          'Erro ao fazer o login, confirme os dados e tente novamente!',
        );
        navigation.replace('Login');
      }
      await AsyncStorage.setItem('back', 'false');
    }
  } catch (e: any) {
    recordErrorFirebase(e);
    Alert.alert('Erro ao acessar a página, tente novamente mais tarde!');
    navigation.replace('Login');
  }
};
