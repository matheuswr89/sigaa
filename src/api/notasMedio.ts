import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { formBody } from "./../utils/globalUtil";
import { headerMedio } from "./../utils/headers";

export const notasMedioAction = async (
  json: any,
  javax: string,
  setLoading: any,
  navigation: any,
  setHtml: any,
  controller: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    let payload = {
      form: "form",
      "javax.faces.ViewState": javax,
      ...json.json,
    };
    let options = {
      method: "POST",
      headers: headerMedio,
      data: formBody(payload),
      withCredentials: true,
      signal: controller.signal,
    };
    setLoading(true);
    const response = await axios(
      " https://sig.ifsudestemg.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf",
      options
    );
    setLoading(false);
    const $ = cheerio.load(response.data);
    const root = parse($.html());
    if (root.querySelector("div#relatorio")) {
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
  } catch (e) {
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
