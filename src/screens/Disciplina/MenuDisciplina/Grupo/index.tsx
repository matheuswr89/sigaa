import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import { global } from "../../../../global";
import { handleBackButtonClick } from "../../../../utils/globalUtil";
import { parseGrupo } from "./util";

const Grupo = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { colors } = useTheme();
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { menu, id, tipo, link }: any = route.params;
  let allAlunos = [],
    grupos: any = {};
  let idAdd = 0;
  useEffect(() => {
    menuDisciplinaAction(
      menu,
      setLoading,
      navigation,
      setHtml,
      controller,
      id,
      tipo,
      link
    );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    grupos = parseGrupo(html.querySelector("form"));
    const alunos = grupos.alunos;
    for (let al of alunos) {
      let teste = al.descricao.split("\n");
      let string = "";
      for (let i = 0; i < teste.length; i++) {
        if (teste[i].length > 0) {
          if (i === 0) string += teste[i] + "\n\n";
          else if (i === teste.length - 1) string += teste[i];
          else string += teste[i] + "\n";
        }
      }
      allAlunos.push({ descricao: string });
    }
  }
  return (
    <SafeAreaView style={global.container2}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: "-40%",
          }}
        >
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: -30 }}>
          <Text style={[styles.titulo, { color: colors.text }]}>
            {grupos.titulo.split(":")[0] + ": " + grupos.titulo.split(":")[1]}
          </Text>
          <Text style={[styles.titulo, { color: colors.text }]}>
            {grupos.num.split(":")[0] + ": " + grupos.num.split(":")[1] + "\n"}
          </Text>
          {allAlunos.map((prof: any) => (
            <View style={styles.card} key={idAdd++}>
              <Text selectable style={styles.menuItemText}>
                {prof.descricao}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#CFDCEF",
    borderRadius: 6,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default Grupo;
