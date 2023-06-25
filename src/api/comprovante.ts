import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse, { HTMLElement } from "node-html-parser";
import { Alert } from "react-native";
import { headers2 } from "../utils/headers";
import { api, payloadUser } from "./api";

export const comprovante = async (
  code: HTMLElement | null | undefined,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any
) => {
  try {
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
    setLoading(true);

    const result = await api.post(
      "/acesso-post",
      {
        url: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
        headers: headers2,
        data: payload,
        data2: await payloadUser(),
      },
      { signal: controller.signal }
    );
    const $1 = cheerio.load(result.data.content);
    const root1 = parse($1.html());
    if (!root1.querySelector("ul.erros")) {
      const response = await api.post("/acesso-get", {
        url: "https://sig.ifsudestemg.edu.br/sigaa/graduacao/matricula/comprovante_solicitacoes.jsf",
        url2: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
        data: await payloadUser(),
      });
      setLoading(false);
      const $ = cheerio.load(response.data.content);
      const root = parse($.html());
      if (root.querySelectorAll("table").length === 4) {
        setHtml(root);
      } else {
        if ((await AsyncStorage.getItem("back")) === "false") {
          navigation.goBack();
          Alert.alert(
            "Erro",
            "Erro ao carregar os dados do comprovante, tente novamente mais tarde!"
          );
        }
        await AsyncStorage.setItem("back", "false");
      }
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        Alert.alert(
          "Erro",
          root1.querySelector("ul.erros")?.textContent.trim()
        );
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
