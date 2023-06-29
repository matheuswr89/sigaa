import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { downloadForum } from "../../../../../api/downloadForum";
import { redirectTopico } from "../../../../../api/topicos";
import { Loading } from "../../../../../components/Loading";
import WebView from "../../../../../components/WebView";
import { global } from "../../../../../global";
import {
  handleBackButtonClick,
  replaceAll,
} from "../../../../../utils/globalUtil";
import { messageParse, parseComments } from "./util";

export default function Topico(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
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
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  let key = 0,
    assunto = [],
    linkA,
    javax,
    form,
    linkFinal,
    json: any = "";
  let mensagem,
    comentarios = [];
  if (html) {
    assunto = html.querySelectorAll(
      'table[style="margin-left:0"] > tbody > tr'
    );
    linkA = assunto[3].querySelector("a")?.attributes.onclick;
    javax = html.querySelector('form > input[name="javax.faces.ViewState"]')
      ?.attributes.value;
    form = html.querySelector('select[name^="form:paginacaoForm"]')?.attributes
      .name;
    linkFinal = linkA?.substring(
      linkA.indexOf("'),{'") + 3,
      linkA.indexOf("'},'") + 2
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
  const baixarForum = () => {
    downloadForum(json);
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
              {replaceAll(assunto[0].textContent)}
            </Text>
            <Text selectable style={[styles.textBold, { color: colors.text }]}>
              {replaceAll(assunto[2].textContent)}
            </Text>
            <Text selectable style={[styles.textBold, { color: colors.text }]}>
              {replaceAll(assunto[4].textContent)}
            </Text>
            {mensagem && (
              <>
                <Text
                  selectable
                  style={[styles.textBold, { color: colors.text }]}
                >
                  Mensagem:
                </Text>
                <View style={styles.container}>
                  <View>
                    <WebView body={mensagem.content} />
                  </View>
                  <Text
                    key={key++}
                    selectable
                    style={[styles.textBold, { color: colors.text }]}
                  ></Text>
                </View>
              </>
            )}
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
                  <WebView body={comments.contents.trim()} isNoticia={true} />
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
    fontSize: 20,
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
    width: 120,
    height: 35,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardMessage: {
    width: "100%",
    flex: 1,
    color: "#000",
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    color: "#0096c7",
    fontSize: 16,
    marginRight: 30,
    justifyContent: "center",
  },
});
