import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { api } from "./api";

interface Payload {
  "user.login": string;
  "user.senha": string;
}

export const login = async (
  user: string,
  senha: string,
  navigation: any,
  setLoading: any,
  setHtml: any,
  controller: any,
  tipo: number
) => {
  try {
    await AsyncStorage.setItem("back", "false");

    if (user && senha) {
      await AsyncStorage.multiSet([
        ["user", user],
        ["senha", senha],
      ]);
      const payload: Payload = {
        "user.login": user,
        "user.senha": senha,
      };
      setLoading(true);

      const response = await api.post(
        "/acesso-post",
        {
          url: "https://sig.ifsudestemg.edu.br/sigaa/logar.do?dispatch=logOn",
          data: payload,
        },
        { signal: controller.signal }
      );

      const $1 = cheerio.load(response.data.content);
      const root = parse($1.html());
      setLoading(false);
      const link = await AsyncStorage.getItem("vinculo");
      if (link && tipo === 1) {
        navigation.replace("HomeScreen", { navigation, link, tipo: 1 });
      } else if (
        root.querySelector("p.usuario")?.attributes.class !== undefined
      ) {
        setHtml(root);
        return root;
      } else {
        if ((await AsyncStorage.getItem("back")) === "false") {
          navigation.goBack();
          Alert.alert(
            "Erro",
            "Erro ao fazer o login, confirme os dados e tente novamente!"
          );
        }
        await AsyncStorage.setItem("back", "false");
      }
    } else {
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert("Erro", "Os campos não podem ficar vazio!");
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    Alert.alert("Erro ao acessar a página, tente novamente mais tarde!");
    navigation.goBack();
  }
};
