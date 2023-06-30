import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cheerio from "cheerio";
import parse from "node-html-parser";
import { Alert } from "react-native";
import { PythonModule } from "./api";

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
        ["@sigaa:USER", user],
        ["@sigaa:SENHA", senha],
      ]);
      const payload: Payload = {
        "user.login": user,
        "user.senha": senha,
      };

      const response = await PythonModule.post(
        "https://sig.ifsudestemg.edu.br/sigaa/logar.do?dispatch=logOn",
        JSON.stringify(payload)
      );
      const $1 = cheerio.load(response);
      const root = parse($1.html());
      const link = await AsyncStorage.getItem("vinculo");
      if (link && tipo === 1) {
        setLoading(false);
        navigation.replace("HomeScreen", { navigation, link, tipo: 1 });
      } else if (
        root.querySelector("p.usuario")?.attributes.class !== undefined
      ) {
        setHtml(root);
        setLoading(false);
        return root;
      } else {
        setLoading(false);
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
      setLoading(false);
      if ((await AsyncStorage.getItem("back")) === "false") {
        navigation.goBack();
        Alert.alert("Erro", "Os campos não podem ficar vazio!");
      }
      await AsyncStorage.setItem("back", "false");
    }
  } catch (e) {
    setLoading(false);
    Alert.alert("Erro ao acessar a página, tente novamente mais tarde!");
    navigation.goBack();
  }
};
