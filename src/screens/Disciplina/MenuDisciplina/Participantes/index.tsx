import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import { global } from "../../../../global";
import { handleBackButtonClick } from "../../../../utils/globalUtil";
import { parseParticipantes } from "./util";

const Participantes = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { colors } = useTheme();
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { menu, id, tipo }: any = route.params;
  let allAlunos = [];
  let professor, alunos;
  let idAdd = 0;
  useEffect(() => {
    menuDisciplinaAction(
      menu,
      setLoading,
      navigation,
      setHtml,
      controller,
      id,
      tipo
    );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    const json = parseParticipantes(html);
    professor = json.professores;
    alunos = json.alunos;
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
        <ScrollView style={{ marginTop: -40 }}>
          <Text selectable style={[global.titulo, { color: colors.text }]}>
            Professores:
          </Text>
          {professor.map((prof: any) => (
            <View style={styles.card} key={idAdd++}>
              <Text selectable style={styles.menuItemText}>
                {prof.descricao}
              </Text>
            </View>
          ))}
          <Text selectable style={[global.titulo, { color: colors.text }]}>
            Alunos:
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

export default Participantes;
