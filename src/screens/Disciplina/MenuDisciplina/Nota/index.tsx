import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import { global } from "../../../../global";
import { handleBackButtonClick } from "../../../../utils/globalUtil";
import { notasDisciplinas } from "./util";

const Notas = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { colors } = useTheme();
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { tipoAluno, menu, id, tipo, link }: any = route.params;
  let keys = 0;
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

  let idAdd = 0,
    materia: any,
    situacao,
    notas: any;
  let avaliacao: any = [],
    descrAv: any = [],
    peso: any = [],
    valor: any = [],
    display: any = [];
  if (html) {
    notas = notasDisciplinas(html, tipoAluno);
    const teste = notas.avaliacoes;
    materia = notas.materia.split("- Turma");
    situacao = notas.situacao === "APR" ? "Aprovado" : "Reprovado";
    for (let ava of teste) {
      avaliacao.push(ava.avaliacao);
      descrAv.push(ava.descricao);
      peso.push(ava.peso);
      valor.push(ava.valor);
    }
    avaliacao.push("Resultado");
    avaliacao.push("Faltas");
    notas.notas.map((inf: any) => {
      display.push(inf);
    });
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
          <Text selectable style={[styles.datahora, { color: colors.text }]}>
            {materia[0]}
          </Text>
          <Text selectable style={[styles.datahora, { color: colors.text }]}>
            Turma{materia[1]}
          </Text>
          <Text selectable style={[styles.datahora, { color: colors.text }]}>
            Situação: {situacao}
          </Text>
          <ScrollView horizontal={true}>
            <Grid>
              {avaliacao.map((ava: any, index: number) => (
                <Col key={ava + idAdd++}>
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      {ava}
                    </Text>
                  </Row>
                  <Row style={styles.cell1}>
                    <Text selectable style={{ color: colors.text }}>
                      {display[index]}
                    </Text>
                  </Row>
                </Col>
              ))}
            </Grid>
          </ScrollView>
          <Text selectable style={[styles.datahora, { color: colors.text }]}>
            Legenda:
          </Text>
          {descrAv.map((descr: any, index: number) => (
            <Text
              selectable
              style={[global.tituloSmall, { color: colors.text }]}
              key={avaliacao[index] + idAdd++ + keys++}
            >
              {avaliacao[index]}: {descr}{" "}
              {peso[index] ? "| Peso: " + peso[index] : ""}
              {valor[index] ? "| Valor: " + valor[index] : ""}
            </Text>
          ))}
          <Text selectable style={[styles.datahora, { color: colors.text }]}>
            {notas.dataAtual}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  datahora: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: 50,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cell1: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    height: 30,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notas;
