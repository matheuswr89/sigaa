import { useTheme } from "@react-navigation/native";
import { HTMLElement } from "node-html-parser";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReadMore from "react-native-read-more-text";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFont from "react-native-vector-icons/FontAwesome5";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { donwloadDisciplina } from "../../../api/donwloadDisciplina";
import MDImage from "../../../components/MDImage";
import ModalAtividades from "../../../components/ModalAtividade";
import { global } from "../../../global";
import { noticiaParse, parseHomeDisciplina } from "./util";

export type PropsHomeDisciplina = {
  html: HTMLElement | undefined;
  navigation: any;
  setLoading: any;
  id: any;
  link: any;
  tipo: 0 | 1;
};

const HomeDisciplina: React.FC<PropsHomeDisciplina> = ({
  html,
  navigation,
  setLoading,
  id,
  link,
  tipo,
}) => {
  let key = 0;
  const [modalVisible, setModalVisibleativi] = useState<boolean>(true);
  const [atividade, setAtividade] = useState(null);
  let homeDisci: any = [];
  const { colors } = useTheme();
  let noticia = [];
  let javax: any;
  if (html) {
    homeDisci = parseHomeDisciplina(html);
    noticia = noticiaParse(html);
    javax = html.querySelector('input[name="javax.faces.ViewState"]')
      ?.attributes.value;
  }

  const acessaAtivididade = (content?: any) => {
    setAtividade(content);
    setModalVisibleativi(false);
  };

  const baixar = (content: any) => {
    donwloadDisciplina(content, javax, id, tipo);
  };

  const mostraAlert = (tipoContent: string, content?: any) => {
    if (tipoContent.includes("fórum")) {
      navigation.navigate("Forum", {
        json: content.link,
        javaxForum: javax,
        setLoading,
        navigation,
        titulo: content.name,
        tipo: 1,
        id,
        tipo1: tipo,
        link,
      });
      return;
    }
    const genero = tipoContent.includes("enquete") ? "a" : "o";
    return Alert.alert(
      "Função não implementada!",
      `Acompanhe ${genero} ${tipoContent} pelo site do SIGAA.`
    );
  };
  const renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text style={[styles.link, { left: "81%" }]} onPress={handlePress}>
        Ver mais
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress: any) => {
    return (
      <Text style={[styles.link, { left: "81%" }]} onPress={handlePress}>
        Ver menos
      </Text>
    );
  };
  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        {noticia.length > 0 && (
          <View style={styles.container}>
            <View style={styles.card}>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={renderTruncatedFooter}
                renderRevealedFooter={renderRevealedFooter}
              >
                {noticia.map((m: any) => {
                  if (m.tipo === "link" && m.content !== "") {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            m.link.includes("https://")
                              ? m.link
                              : "https://sig.ifsudestemg.edu.br" + m.link
                          )
                        }
                        key={m.content + key++}
                      >
                        <Text
                          selectable
                          style={[styles.comment, { color: colors.primary }]}
                        >
                          {m.content.replace(/[\t\r\n]/g, "")}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else if (m.tipo === "text" && m.content !== "") {
                    return (
                      <Text
                        key={m.content + key++}
                        selectable
                        style={[styles.textBold]}
                      >
                        {m.content.replace(/[\t\r\n]/g, "") + "\n\n"}
                      </Text>
                    );
                  } else if (m.tipo === "image" && m.content !== "") {
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
              </ReadMore>
            </View>
          </View>
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
              if (content.tipo === "")
                return (
                  <Text
                    selectable
                    key={key++}
                    style={[styles.conteudo, { color: colors.text }]}
                  >
                    {content.name}
                  </Text>
                );
              else if (content.tipo === "iframe") {
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
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "enquete") {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => mostraAlert("enquete")}
                  >
                    <Text
                      selectable
                      style={[styles.conteudo, { color: colors.text }]}
                    >
                      <Icon name="area-chart" size={15} color="#0096c7" />
                      <Text selectable style={styles.link}>
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "atividade") {
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
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "forum") {
                return (
                  <TouchableOpacity
                    key={key++}
                    onPress={() => mostraAlert("fórum", content)}
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
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "arquivo") {
                return (
                  <TouchableOpacity key={key++} onPress={() => baixar(content)}>
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
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "link") {
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
                        {"  " + content.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (content.tipo === "img") {
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
            tipo1={tipo}
            id={id}
            link={link}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  link: {
    color: "#0096c7",
    fontSize: 15,
    marginRight: 30,
    justifyContent: "center",
  },
  imageStyle: {
    resizeMode: "center",
    alignSelf: "center",
    height: Dimensions.get("window").height / 5.5,
    width: Dimensions.get("window").width / 1,
  },
  comment: {
    fontSize: 14,
  },
  textBold: {
    flex: 1,
    color: "#222",
    fontSize: 14,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    fontWeight: "bold",
    backgroundColor: "#FFFFD5",
    color: "#000",
    borderRadius: 5,
    padding: 10,
  },
});

export default HomeDisciplina;
