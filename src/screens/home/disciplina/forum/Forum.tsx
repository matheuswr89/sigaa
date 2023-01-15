import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {redirectForum} from '../../../../api/forum';
import {global} from '../../../../global';
import {parseForumTopicos, set} from '../../../../utils';
import {Loading} from '../../../Loading';

export default function Forum(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();

  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const route = useRoute();
  const [html, setHtml]: any = useState<HTMLElement>();
  const {json, javaxForum, navigation, tipo}: any = route.params;
  useEffect(() => {
    props.navigation.setOptions({title: props.route.params?.titulo});
    redirectForum(
      json,
      javaxForum,
      setLoading,
      navigation,
      setHtml,
      tipo,
      controller,
    );
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  function handleBackButtonClick() {
    set();
    controller.abort();
    navigation.goBack();
    return true;
  }

  let topicos: any = [];
  let javax: any;
  if (html) {
    topicos = parseForumTopicos(html);
    javax = html.querySelector('input[name="javax.faces.ViewState"]')
      ?.attributes.value;
  }
  const action = (json: any, titulo: string) => {
    navigation.navigate('Topico', {
      topico: json,
      topicoJavax: javax,
      navigation,
      titulo,
    });
  };
  return (
    <View style={{height: '100%'}}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '50%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html && (
        <ScrollView style={[styles.safeArea]}>
          <View style={styles.container}>
            {topicos.length > 0 && (
              <Text selectable style={[global.title, {color: colors.text}]}>
                Tópicos:{' '}
              </Text>
            )}
            {topicos.length === 0 && (
              <Text selectable style={[global.title, {color: colors.text}]}>
                Nenhum tópico cadastrado!
              </Text>
            )}
            {topicos.map((topico: any) => (
              <TouchableOpacity
                key={topico.titulo + topico.autor}
                style={global.menuItem}
                onPress={() => action(topico.link, topico.titulo)}>
                <View>
                  <Text selectable style={global.titulo}>
                    {topico.titulo}
                  </Text>
                  <Text selectable style={global.menuItemText}>
                    Autor(a): {topico.autor}
                  </Text>
                  <Text selectable style={global.menuItemText}>
                    Respostas: {topico.respostas}
                  </Text>
                  <Text selectable style={global.menuItemText}>
                    Última Mensagem:{' '}
                    {topico.ultimaMensagem
                      .replace(/\t/g, '')
                      .replace(/\n/g, ' ')}
                  </Text>
                </View>
                <Text selectable style={global.menuItemIcon}>
                  →
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 28,
    height: '100%',
    paddingBottom: 50,
  },
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 60,
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});
