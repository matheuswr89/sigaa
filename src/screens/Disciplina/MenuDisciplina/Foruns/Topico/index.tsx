import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { downloadForum } from "../../../../../api/downloadForum";
import { redirectTopico } from "../../../../../api/topicos";
import { Loading } from "../../../../../components/Loading";
import { global } from "../../../../../global";
import { set } from "../../../../../utils/globalUtil";
import { messageParse, parseComments } from "./util";

export default function Topico(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();

  const [loading, setLoading] = useState(false);
  const startingHeight = 160;
  const [expander, setExpander] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(startingHeight);
  const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
  let key = 0;
  const { colors } = useTheme();
  const route = useRoute();
  const [html, setHtml]: any = useState<HTMLElement>();
  const { topico, topicoJavax, navigation }: any = route.params;
  useEffect(() => {
    props.navigation.setOptions({ title: props.route.params?.titulo });
    redirectTopico(
      topico,
      topicoJavax,
      setLoading,
      navigation,
      setHtml,
      controller
    );
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  function handleBackButtonClick() {
    set();
    controller.abort();
    navigation.goBack();
    return true;
  }

  let assunto = [];
  let link;
  let javax;
  let form;
  let linkFinal;
  let json: any = "";
  let mensagem = [];
  let comentarios = [];
  if (html) {
    assunto = html.querySelectorAll(
      'table[style="margin-left:0"] > tbody > tr'
    );
    link = assunto[3].querySelector("a")?.attributes.onclick;
    javax = html.querySelector('form > input[name="javax.faces.ViewState"]')
      ?.attributes.value;
    form = html.querySelector('select[name^="form:paginacaoForm"]')?.attributes
      .name;
    linkFinal = link?.substring(
      link.indexOf("'),{'") + 3,
      link.indexOf("'},'") + 2
    );
    if (linkFinal?.includes("':'")) {
      json = {
        ...JSON.parse(linkFinal.replace(/'/g, '"')),
        form: "form",
        "javax.faces.ViewState": javax,
        "form:ordem": 4,
        "form:showModalOpenedState": "",
      };
      if (form) {
        json[`${form}`] = "0";
        json["form:paginacaoForm"] = "form:paginacaoForm";
      }
    }
    mensagem = messageParse(assunto[1]);
    comentarios = parseComments(
      html.querySelectorAll("span[id^='form:comConteudo']")
    );
  }
  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: expanded ? fullHeight : startingHeight,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const baixarForum = () => {
    downloadForum(json);
  };

  const onTextLayout = (e: any) => {
    let { x, y, width, height } = e.nativeEvent.layout;
    height = Math.floor(height) + 40;
    if (height > startingHeight) {
      setFullHeight(height);
      setExpander(true);
    }
  };
  return (
    <SafeAreaView style={global.container2}>
      <ScrollView>
        {loading && (
          <View
            style={{
              height: 250,
              marginTop: "50%",
            }}
          >
            <Loading />
          </View>
        )}
        {!loading && html && (
          <View>
            <Text selectable style={[styles.textBold, { color: colors.text }]}>
              {assunto[0].textContent
                .trim()
                .replace(/\t/g, "")
                .replace(/\n/g, " ")}
            </Text>
            <Text selectable style={[styles.textBold, { color: colors.text }]}>
              {assunto[2].textContent
                .trim()
                .replace(/\t/g, "")
                .replace(/\n/g, " ")}
            </Text>
            <Text selectable style={[styles.textBold, { color: colors.text }]}>
              {assunto[4].textContent
                .trim()
                .replace(/\t/g, "")
                .replace(/\n/g, " ")}
            </Text>
            {json && (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => baixarForum()}
              >
                <Text selectable style={styles.btnText}>
                  Baixar Arquivo
                </Text>
              </TouchableOpacity>
            )}
            {mensagem.length > 0 && (
              <>
                <Animated.View
                  style={[styles.viewPort, { height: animatedHeight }]}
                >
                  <View
                    style={styles.textBox}
                    onLayout={(e) => {
                      onTextLayout(e);
                    }}
                  >
                    <Text
                      selectable
                      style={[styles.textBold, { color: colors.text }]}
                    >
                      Mensagem:
                    </Text>
                    <Text
                      key={key++}
                      selectable
                      style={[styles.textBold, { color: colors.text }]}
                    >
                      {mensagem.map((m: any) => {
                        if (m.tipo === "link" && m.content !== "") {
                          return (
                            <TouchableOpacity
                              onPress={() => Linking.openURL(m.link)}
                              key={m.content + key++}
                            >
                              <Text
                                selectable
                                style={[
                                  styles.comment,
                                  { color: colors.primary },
                                ]}
                              >
                                {m.content}
                              </Text>
                            </TouchableOpacity>
                          );
                        } else if (m.tipo === "text" && m.content !== "") {
                          return m.content + "\n";
                        } else if (m.tipo === "image" && m.content !== "") {
                          return (
                            <Image
                              resizeMethod="resize"
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
                    </Text>
                  </View>
                </Animated.View>
                {expander && (
                  <React.Fragment>
                    <LinearGradient
                      colors={[
                        colors.background,
                        colors.background,
                        colors.background,
                      ]}
                      style={styles.gradient}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setExpanded(!expanded);
                      }}
                    >
                      <Text style={[styles.readBtn, { color: colors.primary }]}>
                        {expanded ? "Ver menos" : "Ver mais"}
                      </Text>
                    </TouchableWithoutFeedback>
                  </React.Fragment>
                )}
              </>
            )}
            {comentarios.length > 0 && (
              <Text
                selectable
                style={[styles.textBold, { color: colors.text }]}
              >
                Comentários:
              </Text>
            )}
            {comentarios.length === 0 && (
              <Text
                selectable
                style={[styles.textBold, { color: colors.text }]}
              >
                Ainda não tem nenhum comentário por aqui!
              </Text>
            )}
            {comentarios.map((comments: any) => (
              <View style={styles.card} key={comments.index}>
                <Text selectable style={styles.menuItemText}>
                  {comments.index}
                </Text>
                <View>
                  {comments.contents.map((m: any) => {
                    if (m.tipo === "link" && m.content !== "") {
                      return (
                        <TouchableOpacity
                          onPress={() => Linking.openURL(m.link)}
                          key={m.content + key++}
                        >
                          <Text
                            selectable
                            style={[styles.comment, { color: colors.primary }]}
                          >
                            {m.content}
                          </Text>
                        </TouchableOpacity>
                      );
                    } else if (m.tipo === "text" && m.content !== "") {
                      return (
                        <Text
                          key={m.content + key++}
                          selectable
                          style={[styles.comment, { color: "#222" }]}
                        >
                          {m.content.replace(/&nbsp;/g, " ") + "\n"}
                        </Text>
                      );
                    } else if (m.tipo === "image" && m.content !== "") {
                      return (
                        <Image
                          progressiveRenderingEnabled={true}
                          resizeMethod="resize"
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
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textBold: {
    fontWeight: "bold",
    fontSize: 17,
  },
  textBox: {
    flex: 1,
    position: "absolute",
  },
  viewPort: {
    flex: 1,
    overflow: "hidden",
    top: 9,
    marginBottom: 20,
  },
  gradient: {
    backgroundColor: "transparent", // required for gradient
    height: 40,
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  readBtn: {
    flex: 1,
    color: "blue",
    alignSelf: "flex-end",
  },
  imageStyle: {
    resizeMode: "stretch",
    height: Dimensions.get("window").height / 5.5,
    width: Dimensions.get("window").width / 1,
  },

  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CFDCEF",
    borderRadius: 6,
    padding: 15,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  comment: {
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#4683DF",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
