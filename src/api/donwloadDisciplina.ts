import axios from "axios";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { formBodyJson, saveFile } from "./../utils/globalUtil";

export const donwloadDisciplina = async (json: any, javax: string) => {
  try {
    getPermissions();
    const payload = {
      ...JSON.parse(json.link.replace(/'/g, '"')),
      "javax.faces.ViewState": javax,
      formAva: "formAva",
      "formAva:idTopicoSelecionado": "0",
    };
    const url =
      "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf?" +
      formBodyJson(payload);
    ToastAndroid.showWithGravity(
      "Baixando o arquivo, agurade um momento...",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false,
      },
    });
    if (response.headers["content-disposition"]) {
      const file = response.headers["content-disposition"]
        .split('"')[1]
        .replace(/"/g, "");
      let type = response.headers["content-type"];
      if (type === undefined) type = "application/octet-stream";
      saveFile(file, type, response.data);
    } else {
      const $ = cheerio.load(Buffer.from(response.data, "binary").toString());
      const turmas = parse($.html());
      if (turmas.querySelector("ul.erros")) {
        Alert.alert(
          "Erro",
          turmas.querySelector("ul.erros")?.textContent.trim()
        );
      } else {
        Alert.alert(
          "Erro",
          "Erro ao baixar o arquivo, tente novamente mais tarde."
        );
      }
    }
  } catch (e) {
    Alert.alert(
      "Erro ao baixar o arquivo!",
      "Provavelmente ele não está mais disponivel nos servidores do SIGAA!"
    );
  }
};
