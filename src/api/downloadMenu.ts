import { Buffer } from "buffer";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { saveFile } from "../utils/globalUtil";
import { headers3 } from "../utils/headers";
import { api, payloadUser } from "./api";

export const downloadMenu = async (payload: any, controller: any) => {
  try {
    getPermissions();
    ToastAndroid.showWithGravity(
      "Baixando o arquivo, agurade um momento...",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    const response = await api.post(
      "/download",
      {
        url: "https://sig.ifsudestemg.edu.br/sigaa/portais/discente/discente.jsf",
        headers: headers3,
        data: payload,
        data2: await payloadUser(),
      },
      {
        signal: controller.signal,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );
    const header = response.data.headers;
    if (
      header["Content-Disposition"] ||
      header["Content-disposition"] ||
      header["content-disposition"]
    ) {
      const file = (
        header["Content-Disposition"] ||
        header["Content-disposition"] ||
        header["content-disposition"]
      )
        .split("filename=")[1]
        .replace(/"/g, "");
      let type = response.data.headers["Content-Type"];
      if (type === undefined) type = "application/octet-stream";
      saveFile(file, type, response.data.content);
    } else {
      const $ = cheerio.load(
        Buffer.from(response.data.content, "binary").toString()
      );
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
