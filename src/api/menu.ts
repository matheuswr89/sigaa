import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as cheerio from "cheerio";
import parse, { HTMLElement } from "node-html-parser";
import { Alert } from "react-native";
import { formBody } from "./../utils/globalUtil";
import { headers2 } from "./../utils/headers";

export const redirectScreen = async (
  name: string,
  code: HTMLElement | null | undefined,
  setLoading: any,
  setHtml: any,
  tipoAluno?: string,
  navigation?: any,
  controller?: any
) => {
  await AsyncStorage.setItem("back", "false");

  if (name) {
    let action = code?.querySelector("div")?.id;
    if (name === "Consultar Notas") {
      if (tipoAluno === "medio")
        action += ":A]#{ portalDiscente.emitirBoletim }";
      else action += ":A]#{ relatorioNotasAluno.gerarRelatorio }";
    } else if (name === "MenuDisciplinaScreen")
      action += ":A]#{ portalDiscente.atestadoMatricula }";
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
    const response = await axios(
      "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
      options
    );
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    setLoading(false);
    if (root.querySelector("ul.erros")) {
      if ((await AsyncStorage.getItem("back")) === "false") {
        Alert.alert("Erro", root.querySelector("ul.erros")?.textContent.trim());
        navigation.goBack();
      }
      await AsyncStorage.setItem("back", "false");
    } else if (
      root.querySelector("div#relatorio-container") ||
      root.querySelectorAll("table.tabelaRelatorio")
    ) {
      setHtml(root);
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.navigate("Login");
        Alert.alert(
          "Erro",
          "Falha ao carregar os dados, tente novamente mais tarde!"
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  }
};
