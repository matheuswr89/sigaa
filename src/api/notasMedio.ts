import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { headerMedio } from "./../utils/headers";
import { api, payloadUser } from "./api";

export const notasMedioAction = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
  payloadPag: any,
  link: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    let payload = {
      form: "form",
      "javax.faces.ViewState": javax,
      ...json.json,
    };
    setLoading(true);
    const response = await api.post(
      "/acesso-post",
      {
        url: "https://sig.ifsudestemg.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf",
        url3: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
        headers: headerMedio,
        data: payload,
        data2: await payloadUser(),
        data3: payloadPag,
        link,
      },
      { signal: controller.signal }
    );
    setLoading(false);
    const $ = cheerio.load(response.data.content);
    const root = parse($.html());
    if (root.querySelector("div#relatorio")) {
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert(
          "Erro",
          "Falha ao carregar os dados, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
