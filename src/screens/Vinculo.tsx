import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {parse} from 'node-html-parser';
import {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {login} from '../api/login';
import {global} from '../global';
import {parseVinculos, set} from '../utils';
import {Loading} from './Loading';

export default function HomeScreen(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const route = useRoute();
  const {user, senha, navigation}: any = route.params;
  const {colors} = useTheme();

  let vinculos: any[] = [];

  useEffect(() => {
    login(user, senha, navigation, setLoading, setHtml, controller);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [user, senha]);

  function handleBackButtonClick() {
    set();
    controller.abort();
    navigation.goBack();
    return true;
  }

  if (html) {
    const parsedHTML = parse(html);
    if (parsedHTML.querySelector('#conteudo > h2') === null) {
      navigation.navigate('HomeScreen', {
        navigation,
        html2: html,
        vinculos: [],
      });
    }
    vinculos = parseVinculos(parsedHTML);
  }

  const vaiParaOVinculo = (link: string) => {
    navigation.navigate('HomeScreen', {navigation, link, vinculos});
  };

  return (
    <ScrollView style={[styles.safeArea]}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '70%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && (
        <>
          {vinculos.length > 0 && (
            <Text selectable style={[styles.text1, {color: colors.text}]}>
              Escolha um vínculo:
            </Text>
          )}
          {vinculos.map((v: any) => (
            <TouchableOpacity
              key={v.link}
              style={global.menuItem}
              onPress={() => vaiParaOVinculo(v.link)}>
              <View>
                <Text selectable style={global.menuItemText}>
                  {v.curso}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Matricula: {v.matricula}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Vinculo: {v.tipo}
                </Text>
              </View>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 29,
    height: '100%',
  },
  text1: {
    fontSize: 31,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});
