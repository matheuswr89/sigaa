import { useTheme } from '@react-navigation/native';
import { HTMLElement } from 'node-html-parser';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MDImage from '../../../components/MDImage';
import ModalAtividades from '../../../components/ModalAtividade';
import ModalDownload from '../../../components/ModalDownload';
import ModalEnquete from '../../../components/ModalEnquetes';
import WebView from '../../../components/WebView';
import { global } from '../../../global';
import { replaceAll } from '../../../utils/globalUtil';
import { parseHomeDisciplina } from './util';

export type PropsHomeDisciplina = {
  html: HTMLElement | undefined;
  navigation: any;
  setLoading: any;
};

const HomeDisciplina: React.FC<PropsHomeDisciplina> = ({
  html,
  navigation,
  setLoading,
}) => {
  let key = 0;
  const { colors } = useTheme();
  const [enquete, setEnquete] = useState(null);
  const [payload, setPayload] = useState({});
  const [atividade, setAtividade] = useState(null);
  const [showNoticia, setShowNoticia] = useState(false);
  const [modalVisible, setModalVisibleativi] = useState<boolean>(true);
  const [modalVisibleEnquete, setModalVisibleEnquete] = useState<boolean>(true);
  const [modalVisibleDownload, setModalVisibleDownload] =
    useState<boolean>(true);

  let homeDisci: any = [],
    noticia,
    javax: any;
  if (html) {
    homeDisci = parseHomeDisciplina(html, navigation);
    javax = html.querySelector('input[name="javax.faces.ViewState"]')
      ?.attributes.value;
    noticia = html.querySelector('div.descricaoOperacao')?.innerHTML.trim();
  }

  const acessaAtivididade = (content?: any) => {
    setAtividade(content);
    setModalVisibleativi(false);
  };

  const acessaQuestionario = (content?: any) => {
    Alert.alert(
      'Função não implementada!',
      'O acesso ao questionário é somente pelo site do SIGAA!',
    );
  };

  const baixar = (content: any) => {
    setPayload(content);
    setModalVisibleDownload(false);
  };

  const acessaEnquete = (json: any) => {
    const jsonDefinitivo = {
      formAva: 'formAva',
      'formAva:idTopicoSelecionado': 0,
      'javax.faces.ViewState': javax,
      ...JSON.parse(json.replace(/'/g, '"')),
    };
    setEnquete(jsonDefinitivo);
    setModalVisibleEnquete(false);
  };

  const acessaForum = (content: any) => {
    navigation.navigate('Forum', {
      json: content.link,
      javaxForum: javax,
      setLoading,
      navigation,
      titulo: content.name,
      tipo: 1,
    });
  };

  return (
    <SafeAreaView style={global.container2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {noticia && (
          <>
            {showNoticia && (
              <View style={styles.card}>
                <WebView
                  body={noticia.split('Cadastrado')[0]}
                  isNoticia={true}
                />
                <Text>
                  Cadastrado por:
                  {replaceAll(noticia.split('Cadastrado por:')[1])}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[styles.btn, { marginTop: 2 }]}
              onPress={() => setShowNoticia(!showNoticia)}
            >
              <Text selectable style={styles.btnText}>
                {!showNoticia ? 'Mostrar' : 'Ocultar'} noticia
              </Text>
            </TouchableOpacity>
          </>
        )}
        <View
          key={key++}
          style={{
            marginTop: 20,
            borderBottomColor: colors.text,
            borderBottomWidth: 2,
          }}
        />
        {homeDisci.map((home: any) => (
          <View key={key++}>
            <Text
              selectable
              key={key++}
              style={[styles.titulo, { color: colors.text }]}
            >
              {home.titulo}
            </Text>
            {home.content.map((content: any) => {
              if (content.tipo === '')
                return (
                  <Text
                    selectable
                    key={key++}
                    style={[styles.conteudo, { color: colors.text }]}
                  >
                    {content.name}
                  </Text>
                );
              else if (content.tipo === 'iframe') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => Linking.openURL(content.link)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <Icon name="youtube-play" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'enquete') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => acessaEnquete(content.link)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <Icon name="area-chart" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'atividade') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => acessaAtivididade(content)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <IconFont name="tasks" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'questionario') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => acessaQuestionario(content)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <IconFont name="edit" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'forum') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => acessaForum(content)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <IconMaterialIcons
                        name="forum"
                        size={15}
                        color="#0096c7"
                      />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'arquivo') {
                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    key={key++}
                    onPress={() => baixar(content)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <IconFont
                        name="file-download"
                        size={15}
                        color="#0096c7"
                      />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'link') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => Linking.openURL(content.link)}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <Icon
                        name="external-link"
                        size={15}
                        color="#0096c7"
                        style={{ marginLeft: 10 }}
                      />
                      <Text selectable style={styles.link}>
                        {'  ' + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'img') {
                return <MDImage uri={content.link} key={key++} />;
              }
            })}
            <View
              key={key++}
              style={{
                marginTop: 20,
                borderBottomColor: colors.text,
                borderBottomWidth: 2,
              }}
            />
          </View>
        ))}
        {!modalVisible && (
          <ModalAtividades
            modalVisible={modalVisible}
            open={setModalVisibleativi}
            att={atividade}
            tipo={1}
            javax={javax}
          />
        )}
        {!modalVisibleEnquete && (
          <ModalEnquete
            modalVisible={modalVisibleEnquete}
            open={setModalVisibleEnquete}
            enquete={enquete}
            tipo={1}
          />
        )}
        {!modalVisibleDownload && (
          <ModalDownload
            modalVisible={modalVisibleDownload}
            open={setModalVisibleDownload}
            payload={payload}
            tipo="disciplina"
            javax={javax}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  link: {
    color: '#0096c7',
    fontSize: 15,
    marginRight: 30,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'center',
    alignSelf: 'center',
    height: Dimensions.get('window').height / 5.5,
    width: Dimensions.get('window').width / 1,
  },
  comment: {
    fontSize: 14,
  },
  textBold: {
    flex: 1,
    color: '#222',
    fontSize: 14,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    fontWeight: 'bold',
    backgroundColor: '#FFFFD5',
    color: '#000',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    backgroundColor: '#4683DF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 8,
    width: 120,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeDisciplina;
