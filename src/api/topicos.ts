import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { api, payloadUser } from "./api";

export const redirectTopico = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any,
  payloadPag: any,
  payloadForum: any,
  id: any,
  tipo: any,
  setPayloadTopico?: any,
  link?: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    const parseJSON = JSON.parse(json.replace(/'/g, '"'));
    const payload = {
      ...parseJSON,
      "javax.faces.ViewState": javax,
    };
    payload["form"] = "form";

    setLoading(true);

    const options: any = {
      url: "https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/view.jsf",
      data: payload,
      data2: await payloadUser(),
      id,
      tipo,
      link,
    };

    if (payloadPag) {
      options["data3"] = payloadPag;
      options["url3"] = "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf";
      options["data4"] = payloadForum;
      options["url4"] =
        "https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf";
    } else {
      options["data3"] = payloadForum;
      options["url3"] = "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf";
    }

    const response = await api.post("/acesso-post", options, {
      signal: controller.signal,
    });

    setLoading(false);
    if (setPayloadTopico) setPayloadTopico(payload);

    const $ = cheerio.load(response.data.content);
    const root = parse($.html());

    if (root.querySelector("div.form-actions")) {
      setHtml(root.querySelector("#conteudo"));
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert(
          "Erro",
          "Erro ao carregar o tópico, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
