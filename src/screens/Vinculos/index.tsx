import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { parse } from "node-html-parser";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../api/login";
import { Loading } from "../../components/Loading";
import { global } from "../../global";
import { handleBackButtonClick } from "../../utils/globalUtil";
import { parseVinculos } from "./util";

export default function Vinculos() {
  const route = useRoute();
  const { colors } = useTheme();
  const navigation: any = useNavigation();
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const { user, senha, tipo, htmlVin }: any = route.params;

  let vinculos: any[] = [];

  useEffect(() => {
    if (tipo === 1) setHtml(htmlVin);
    else login(user, senha, navigation, setLoading, setHtml, controller, 1);
  }, [user, senha]);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    const parsedHTML = parse(html);
    if (parsedHTML.querySelector("#conteudo > h2") === null) {
      navigation.replace("HomeScreen", {
        navigation,
        html2: html,
        tipo: 1,
      });
      setHtml(null);
    }
    vinculos = parseVinculos(parsedHTML);
  }

  const vaiParaOVinculo = async (link: string) => {
    Alert.alert(
      "Deseja salvar a sua escolha de vínculo?",
      "Caso você queira trocar o vínculo é só ir em Perfil -> Mudar vínculo.",
      [
        {
          text: "Sim",
          onPress: async () => {
            await AsyncStorage.setItem("vinculo", link);
            navigation.replace("HomeScreen", { navigation, link, tipo: 1 });
          },
        },
        {
          text: "Não",
          onPress: () =>
            navigation.replace("HomeScreen", { navigation, link, tipo: 1 }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        {loading && (
          <View
            style={{
              height: 250,
              marginTop: "70%",
            }}
          >
            <Loading />
          </View>
        )}
        {!loading && html !== undefined && (
          <>
            {vinculos.length > 0 && (
              <Text selectable style={[global.titulo, { color: colors.text }]}>
                Escolha um vínculo:
              </Text>
            )}
            {vinculos.map((v: any) => (
              <TouchableOpacity
                key={v.link}
                style={global.menuItem}
                onPress={() => vaiParaOVinculo(v.link)}
              >
                <View>
                  <Text selectable style={global.menuItemText}>
                    {v.curso}
                  </Text>
                  <Text selectable style={global.menuItemText}>
                    Matricula: {v.matricula}
                  </Text>
                  <Text selectable style={global.menuItemText}>
                    Vinculo: {v.tipo}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
