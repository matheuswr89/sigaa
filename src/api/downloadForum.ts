import { Buffer } from "buffer";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { saveFile } from "../utils/globalUtil";
import { headerTarefa } from "../utils/headers";
import { api, payloadUser } from "./api";

export const downloadForum = async (
  payload: any,
  payloadPag: any,
  payloadForum: any,
  payloadTopico: any,
  id: any,
  tipo: any,
  link: any
) => {
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
        url: "https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf",
        headers: headerTarefa,
        data: payload,
        data2: await payloadUser(),
        data3: payloadPag,
        url3: "https://sig.ifsudestemg.edu.br/sigaa/ava/index.jsf",
        data4: payloadForum,
        url4: "https://sig.ifsudestemg.edu.br/sigaa/ava/ForumTurma/lista.jsf",
        data5: payloadTopico,
        url5: "https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/view.jsf",
        id,
        tipo,
        link,
      },
      {
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
