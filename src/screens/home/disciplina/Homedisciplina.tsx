import {useTheme} from '@react-navigation/native';
import {HTMLElement} from 'node-html-parser';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {downloadDisci} from '../../../api/donwloadDIsci';
import {noticiaParse, parseHomeDisciplina} from '../../../utils';
import ModalAtividades from '../atividades/ModalAtividade';

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
  const [modalVisible, setModalVisibleativi] = useState<boolean>(true);
  const [atividade, setAtividade] = useState(null);
  let homeDisci: any = [];
  const {colors} = useTheme();
  let noticia: any = [];
  let javax: any;
  if (html) {
    homeDisci = parseHomeDisciplina(html);
    noticia = noticiaParse(html);

    javax = html.querySelector('input[name="javax.faces.ViewState"]')
      ?.attributes.value;

    const teste = html
      ?.querySelector('div[id="conteudo"]')
      ?.innerHTML.replace(
        'action="/sigaa/ava/index.jsf"',
        'action="https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf"',
      )
      .replace(/src="/g, 'src="https://sig.ifsudestemg.edu.br')
      .replace(/src=\\"/g, 'src="https://sig.ifsudestemg.edu.br')
      .replace(/<a href="/g, '<a href="https://sig.ifsudestemg.edu.br')
      .replace(/href="#"/g, 'href="https://sig.ifsudestemg.edu.br/#"');
  }

  const acessaAtivididade = (content?: any) => {
    setAtividade(content);
    setModalVisibleativi(false);
  };

  const baixar = (content: any) => {
    downloadDisci(content, javax);
  };

  const mostraAlert = (tipo: string, content?: any) => {
    if (tipo.includes('fórum')) {
      navigation.navigate('Forum', {
        json: content.link,
        javaxForum: javax,
        setLoading,
        navigation,
        titulo: content.name,
        tipo: 1,
      });
      return;
    }
    const genero =
      tipo.includes('atividade') || tipo.includes('enquete') ? 'a' : 'o';
    const baixar = tipo.includes('arquivo') ? 'Baixe' : 'Acompanhe';
    return Alert.alert(
      'Função não implementada!',
      `${baixar} ${genero} ${tipo} pelo site do SIGAA.`,
    );
  };
  const startingHeight = 60;
  const [expander, setExpander] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(startingHeight);
  const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: expanded ? fullHeight : startingHeight,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const onTextLayout = (e: any) => {
    let {x, y, width, height} = e.nativeEvent.layout;
    height = Math.floor(height);
    if (height > startingHeight) {
      setFullHeight(height);
      setExpander(true);
    }
  };

  return (
    <ScrollView style={[styles.safeArea]}>
      <View>
        {noticia.length > 0 && (
          <>
            <Animated.View style={[styles.viewPort, {height: animatedHeight}]}>
              <View
                style={[styles.noticia, styles.textBox]}
                onLayout={e => {
                  onTextLayout(e);
                }}>
                {noticia.map((m: any) => {
                  if (m.tipo === 'link' && m.content !== '') {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            m.link.includes('https://')
                              ? m.link
                              : 'https://sig.ifsudestemg.edu.br' + m.link,
                          )
                        }
                        key={m.content + key++}>
                        <Text
                          selectable
                          style={[styles.comment, {color: colors.primary}]}>
                          {m.content}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else if (m.tipo === 'text' && m.content !== '') {
                    return (
                      <Text
                        key={m.content + key++}
                        selectable
                        style={[styles.textBold]}>
                        {m.content + '\n'}
                      </Text>
                    );
                  } else if (m.tipo === 'image' && m.content !== '') {
                    return (
                      <Image
                        progressiveRenderingEnabled={true}
                        key={m.content + key++}
                        style={styles.imageStyle}
                        source={{
                          uri: m.content,
                        }}
                      />
                    );
                  }
                })}
              </View>
            </Animated.View>
            {expander && (
              <React.Fragment>
                <LinearGradient
                  colors={[
                    colors.background, // Change this gradient to match BG
                    colors.background,
                    colors.background,
                  ]}
                  style={styles.gradient}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setExpanded(!expanded);
                  }}>
                  <Text style={[styles.readBtn, {color: colors.primary}]}>
                    {expanded ? 'Ver menos' : 'Ver mais'}
                  </Text>
                </TouchableWithoutFeedback>
              </React.Fragment>
            )}
          </>
        )}
        {homeDisci.map((home: any) => (
          <View key={key++}>
            <Text
              selectable
              key={key++}
              style={[styles.titulo, {color: colors.text}]}>
              {home.titulo}
            </Text>
            {home.content.map((content: any) => {
              if (content.tipo === '')
                return (
                  <Text
                    selectable
                    key={key++}
                    style={[styles.conteudo, {color: colors.text}]}>
                    {content.name}
                  </Text>
                );
              else if (content.tipo === 'iframe') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => Linking.openURL(content.link)}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <Icon name="youtube-play" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'enquete') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => mostraAlert('enquete')}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'atividade') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => acessaAtivididade(content)}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <IconFont name="tasks" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'forum') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => mostraAlert('fórum', content)}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <IconMaterialIcons
                        name="forum"
                        size={15}
                        color="#0096c7"
                      />
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'arquivo') {
                return (
                  <TouchableOpacity key={key++} onPress={() => baixar(content)}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <IconFont
                        name="file-download"
                        size={15}
                        color="#0096c7"
                      />
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'link') {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => Linking.openURL(content.link)}>
                    <Text
                      selectable
                      style={[styles.conteudo, {color: colors.text}]}>
                      <Icon
                        name="external-link"
                        size={15}
                        color="#0096c7"
                        style={{marginLeft: 10}}
                      />
                      <Text selectable style={styles.link}>
                        {content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === 'img') {
                return (
                  <Image
                    progressiveRenderingEnabled={true}
                    key={key++}
                    style={styles.imageStyle}
                    source={{
                      uri: content.link,
                    }}
                  />
                );
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
        <View style={styles.viewLivre} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
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
    textContent: 'center',
  },
  imageStyle: {
    resizeMode: 'center',
    alignSelf: 'center',
    height: Dimensions.get('window').height / 5.5,
    width: Dimensions.get('window').width / 1,
  },
  viewLivre: {
    padding: 30,
  },
  noticia: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: '#FFFFD5',
    color: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  comment: {
    fontSize: 14,
  },
  textBold: {
    flex: 1,
    color: '#222',
    fontSize: 12,
  },
  textBox: {
    flex: 1,
    position: 'absolute',
  },
  viewPort: {
    flex: 1,
    overflow: 'hidden',
    top: 9,
    marginBottom: 20,
  },
  gradient: {
    backgroundColor: 'transparent', // required for gradient
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  readBtn: {
    flex: 1,
    color: 'blue',
    alignSelf: 'flex-end',
  },
});

export default HomeDisciplina;