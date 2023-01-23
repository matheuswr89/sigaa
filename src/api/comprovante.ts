import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import parse, { HTMLElement } from "node-html-parser";
import { Alert } from "react-native";
import { formBody } from "../utils/globalUtil";
import { headers2 } from "../utils/headers";

export const comprovante = async (
  code: HTMLElement | null | undefined,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any
) => {
  await AsyncStorage.setItem("back", "false");

  let action = code?.querySelector("div")?.id;
  action += ":A]#{ matriculaGraduacao.verComprovanteSolicitacoes}";

  const payload = {
    "menu:form_menu_discente": "menu:form_menu_discente",
    id: code?.querySelector("input[name='id']")?.attributes.value,
    jscook_action: action,
    "javax.faces.ViewState": code?.querySelector(
      "input[name='javax.faces.ViewState']"
    )?.attributes.value,
  };
  let options = {
    method: "POST",
    headers: headers2,
    data: formBody(payload),
    withCredentials: true,
    signal: controller.signal,
  };

  setLoading(true);
  const result = await axios(
    "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
    options
  );
  const $1 = cheerio.load(result.data);
  const root1 = parse($1.html());
  if (!root1.querySelector("ul.erros")) {
    const response: AxiosResponse = await axios.get(
      "https://sig.ifsudestemg.edu.br/sigaa/graduacao/matricula/comprovante_solicitacoes.jsf"
    );
    setLoading(false);
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    if (root.querySelector("div#relatorio-container")) {
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.navigate("Login");
        Alert.alert(
          "Erro",
          "Erro ao carregar os dados do comprovante, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } else {
    if ((await AsyncStorage.getItem("back")) === "false") {
      Alert.alert("Erro", root1.querySelector("ul.erros")?.textContent.trim());
    }
    await AsyncStorage.setItem("back", "false");
  }
};
