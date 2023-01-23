import axios from "axios";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { formBody, saveFile } from "../utils/globalUtil";
import { headerTarefa } from "../utils/headers";

export const downloadForum = async (payload: any) => {
  getPermissions();
  ToastAndroid.showWithGravity(
    "Baixando o arquivo, agurade um momento...",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
  const url =
    "https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf";
  const response = await axios(url, {
    headers: headerTarefa,
    data: formBody(payload),
    method: "POST",
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
      .split("filename=")[1]
      .replace(/"/g, "");
    let type = response.headers["content-type"];
    if (type === undefined) type = "application/octet-stream";
    saveFile(file, type, response.data);
  } else {
    const $ = cheerio.load(Buffer.from(response.data, "binary").toString());
    const turmas = parse($.html());
    if (turmas.querySelector("ul.erros")) {
      Alert.alert("Erro", turmas.querySelector("ul.erros")?.textContent.trim());
    } else {
      Alert.alert(
        "Erro",
        "Erro ao baixar o arquivo, tente novamente mais tarde."
      );
    }
  }
};
