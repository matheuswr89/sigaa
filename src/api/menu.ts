import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse, { HTMLElement } from "node-html-parser";
import { Alert } from "react-native";
import { headers2 } from "./../utils/headers";
import { api, payloadUser } from "./api";

export const redirectScreen = async (
  name: string,
  code: HTMLElement | null | undefined,
  setLoading: any,
  setHtml: any,
  tipoAluno?: string,
  navigation?: any,
  controller?: any,
  setPayload?: any
) => {
  try {
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

      setLoading(true);
      setPayload(payload);
      const response = await api.post(
        "/acesso-post",
        {
          url: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
          headers: headers2,
          data: payload,
          data2: await payloadUser(),
        },
        { signal: controller.signal }
      );
      const $ = cheerio.load(response.data.content);
      const root = parse($.html());
      setLoading(false);
      if (root.querySelector("ul.erros")) {
        if ((await AsyncStorage.getItem("back")) === "false") {
          Alert.alert(
            "Erro",
            root.querySelector("ul.erros")?.textContent.trim()
          );
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
          navigation.goBack();
          Alert.alert(
            "Erro",
            "Falha ao carregar os dados, tente novamente mais tarde!"
          );
        }
        await AsyncStorage.setItem("back", "false");
      }
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página, tente novamente mais tarde!");
    navigation.goBack();
  }
};
