import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { parse } from "node-html-parser";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../api/login";
import { Loading } from "../../components/Loading";
import { global } from "../../global";
import { handleBackButtonClick } from "../../utils/globalUtil";
import { parseVinculos } from "./util";

export default function Vinculos() {
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const route = useRoute();
  const { user, senha, navigation }: any = route.params;
  const { colors } = useTheme();

  let vinculos: any[] = [];

  useEffect(() => {
    login(user, senha, navigation, setLoading, setHtml, controller);
  }, [user, senha]);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    const parsedHTML = parse(html);
    if (parsedHTML.querySelector("#conteudo > h2") === null) {
      navigation.replace("HomeScreen", {
        navigation,
        html2: html,
        vinculos,
      });
      setHtml(null);
    }
    vinculos = parseVinculos(parsedHTML);
  }

  const vaiParaOVinculo = (link: string) => {
    navigation.navigate("HomeScreen", { navigation, link, vinculos });
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
