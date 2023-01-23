import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import { global } from "../../../../global";
import { set } from "../../../../utils/globalUtil";
import { parseForuns } from "./util";

const Foruns = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { colors } = useTheme();
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { menu }: any = route.params;
  let foruns: any = {},
    javaxForum: any;
  const action = (json: any, titulo: string) => {
    navigation.navigate("Forum", {
      json,
      javaxForum,
      setLoading,
      navigation,
      titulo,
    });
  };
  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  function handleBackButtonClick() {
    set();
    controller.abort();
    navigation.goBack();
    return true;
  }
  if (html) {
    foruns = parseForuns(html.querySelectorAll("table.listing"));
    javaxForum = html?.querySelector('input[name="javax.faces.ViewState"]')
      ?.attributes.value;
  }

  return (
    <View style={global.container2}>
      <ScrollView>
        {loading && (
          <View
            style={{
              height: 250,
              marginTop: "50%",
            }}
          >
            <Loading />
          </View>
        )}
        {!loading &&
          html !== undefined &&
          foruns.forunsTurma.map((forum: any) => (
            <TouchableOpacity
              key={forum.titulo}
              style={global.menuItem}
              onPress={() => action(forum.link, forum.titulo)}
            >
              <View>
                <Text selectable style={global.tituloCard}>
                  {forum.titulo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Tipo: {forum.tipo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Autor(a): {forum.autor}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Tópicos: {forum.topicos}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Criação: {forum.criacao}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Início: {forum.inicio}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Fim: {forum.fim}
                </Text>
              </View>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
export default Foruns;
