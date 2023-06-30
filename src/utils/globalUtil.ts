import AsyncStorage from "@react-native-async-storage/async-storage";

import parse from "node-html-parser";
import { ToastAndroid } from "react-native";

export const formBody = (payload: any) =>
  Object.keys(payload)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
    )
    .join("&");

export const formBodyJson = (payload: any) =>
  Object.keys(payload)
    .map((key) => key + "=" + payload[key])
    .join("&");

export async function set() {
  await AsyncStorage.setItem("back", "true");
}

export async function setTipoAluno(tipo = "graduacao") {
  await AsyncStorage.setItem("tipoAluno", tipo);
}

export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && (isFinite(n) || Number.isInteger(n));
}

export function handleBackButtonClick(controller: any, navigation: any) {
  set();
  controller.abort();
  navigation.goBack();
  return true;
}

export const exibeToast = () => {
  ToastAndroid.showWithGravity(
    "Baixando o arquivo, agurade um momento...",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

export const replaceAll = (content: string) => {
  return content
    ?.trim()
    ?.replace(/\n/g, " ")
    ?.replace(/\t/g, "")
    ?.replace(/\r/g, "")
    ?.replace(/<i>|<\/i>\s*<\/small>/gm, "")
    ?.replace(/\s\s/g, "");
};

export const replaceIfEmpty = (match: any, args: any[]) => {
  const content = parse(match);

  if (content.innerHTML.includes("img")) {
    if (!content.querySelector("img")?.attributes.src.includes("http")) {
      content
        .querySelector("img")
        ?.setAttribute(
          "src",
          "https://sig.ifsudestemg.edu.br" +
            content.querySelector("img")?.attributes.src
        );
    }
    return content.innerHTML;
  }

  if (content.textContent.length < 5) {
    return "";
  }

  if (content.innerText === "&nbsp;") {
    return "";
  }
  return match;
};

export const replaceHeader = (match: string, args: any[]) => {
  const fileName = match.substring(23, match.length - 2);
  return `"${fileName}"`;
};
