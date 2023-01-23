import axios from "axios";
import { Buffer } from "buffer";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { formBody, saveFile } from "../utils/globalUtil";
import { headers3 } from "../utils/headers";

export const downloadMenu = async (payload: any, controller: any) => {
  getPermissions();
  ToastAndroid.showWithGravity(
    "Baixando o arquivo, agurade um momento...",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
  const url =
    "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf";
  const response = await axios(url, {
    headers: headers3,
    data: formBody(payload),
    method: "POST",
    responseType: "arraybuffer",
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    transitional: {
      silentJSONParsing: false,
      forcedJSONParsing: false,
    },
    signal: controller.signal,
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
