import { Buffer } from "buffer";
import * as cheerio from "cheerio";
import { parse } from "node-html-parser";
import { Alert, ToastAndroid } from "react-native";
import getPermissions from "../hooks/getPermissions";
import { replaceHeader, saveFile } from "../utils/globalUtil";
import { PythonModule } from "./api";

export const downloadForum = async (payload: any) => {
  try {
    getPermissions();
    ToastAndroid.showWithGravity(
      "Baixando o arquivo, agurade um momento...",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    const response = String(
      await PythonModule.download(
        "https://sig.ifsudestemg.edu.br/sigaa/ava/Foruns/Mensagem/view.jsf",
        JSON.stringify(payload)
      )
    );
    const regex = /'content': \[(.*?)\], 'headers': \{(.*?)\}/;
    const matches: any = response.match(regex);
    if (matches) {
      const headersFormated = `{${matches[2].replace(/'/gm, '"')}}`.replace(
        /"att.*""/gm,
        replaceHeader
      );
      const headers = JSON.parse(headersFormated);
      const content = JSON.parse(`{"contents": [${matches[1]}]}`);

      if (
        headers["Content-Disposition"] ||
        headers["Content-disposition"] ||
        headers["content-disposition"]
      ) {
        const file =
          headers["Content-Disposition"] ||
          headers["Content-disposition"] ||
          headers["content-disposition"];
        let type = headers["Content-Type"];
        if (type === undefined) type = "application/octet-stream";
        await saveFile(file, type, content.contents);
      } else {
        const $ = cheerio.load(
          Buffer.from(content.contents, "binary").toString()
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
    }
  } catch (e) {
    Alert.alert(
      "Erro ao baixar o arquivo!",
      "Provavelmente ele não está mais disponivel nos servidores do SIGAA!"
    );
  }
};
