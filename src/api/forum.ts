import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { api, payloadUser } from "./api";

export const redirectForum = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  tipo?: number,
  controller?: any,
  id?: number,
  tipo1?: number,
  payloadPag?: any,
  setPayloadForum?: any,
  link?: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    let payload: any = {};
    const url =
      tipo === 1
        ? "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf"
        : "https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf";
    if (tipo === 1) {
      payload = {
        ...parseJSON,
        "javax.faces.ViewState": javax,
        formAva: "formAva",
        "formAva:idTopicoSelecionado": 0,
      };
    } else {
      payload = {
        ...parseJSON,
        "javax.faces.ViewState": javax,
        form: "form",
      };
    }

    setLoading(true);
    if (setPayloadForum) setPayloadForum(payload);

    let options: any = {
      url,
      data: payload,
      data2: await payloadUser(),
      id,
      tipo: tipo1,
      link,
    };

    if (tipo === undefined) {
      options["data3"] = payloadPag;
      options["url3"] = "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf";
    }

    const response = await api.post("/acesso-post", options, {
      signal: controller.signal,
    });

    setLoading(false);
    const $ = cheerio.load(response.data.content);
    const root = parse($.html());
    if (root.querySelector("div.infoAltRem")) {
      setHtml(root.querySelector("#conteudo"));
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert(
          "Erro",
          "Erro ao carregar os fóruns, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
