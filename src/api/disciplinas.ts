import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { PythonModule } from "./api";

export const getDisciplina = async (
  json: any,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    if (json) {
      let payload: any = {
        turmaVirtual: json.turmaVirtual,
        "javax.faces.ViewState": json.javax,
        idTurma: json.id,
        form: json.form_acessarTurmaVirtual,
      };
      var str = JSON.stringify(payload);
      str = str.replace('"turmaVirtual"', '"' + json.turmaVirtual + '"');
      str = str.replace('"form"', '"' + json.form_acessarTurmaVirtual + '"');
      payload = JSON.parse(str);

      const response = await PythonModule.post(
        "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
        JSON.stringify(payload)
      );
      const $ = cheerio.load(response);
      const root = parse($.html());
      setLoading(false);
      if (root.querySelector("div#conteudo")) {
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
    Alert.alert("Erro ao acessar a página!", "Tente novamente mais tarde!");
    navigation.goBack();
  }
};
