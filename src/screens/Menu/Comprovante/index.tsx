import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { comprovante } from "../../../api/comprovante";
import { Loading } from "../../../components/Loading";
import { handleBackButtonClick } from "../../../utils/globalUtil";
import { parseComprovante, parseTableHorarios, parseUserDados } from "./util";

export default function ConsultarMatricula() {
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const route = useRoute();
  const { colors } = useTheme();
  const { navigation, wrapper }: any = route.params;
  let emissao: any;
  let gravacao: any = "";
  let dadosUser: any = [];
  let dadosDisciplines: any = [];
  let dadosHorarios: any[] = [];
  let key = 0;
  useEffect(() => {
    comprovante(wrapper, navigation, setLoading, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    dadosDisciplines = parseComprovante(html);
    dadosHorarios = parseTableHorarios(html);
    dadosUser = parseUserDados(html);
    emissao = html?.querySelector("span.dataAtual")?.textContent.trim();
    gravacao = html
      ?.querySelector('div[style="color: gray; text-align: center"]')
      ?.textContent.trim();
    dadosHorarios.shift();
  }
  return (
    <SafeAreaView style={[{ padding: 16, height: "100%" }]}>
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
        <ScrollView>
          <Text
            selectable
            style={{ fontWeight: "bold", color: colors.text, fontSize: 20 }}
          >
            {emissao}
          </Text>
          {dadosUser.map((dado: any) => (
            <Text
              selectable
              style={{ fontWeight: "bold", color: colors.text, fontSize: 20 }}
              key={dado + key++}
            >
              {dado}
            </Text>
          ))}
          <View style={{ paddingTop: 20 }} />
          <ScrollView horizontal={true}>
            <Grid style={{ paddingBottom: 10 }}>
              <Row>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Componente Curricular
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Turma
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Local
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Situação
                  </Text>
                </Col>
              </Row>
              {dadosDisciplines.map((dado: any) => (
                <Row key={dado.disciplina + key++}>
                  <Col style={styles.cell1}>
                    <Text selectable style={{ color: colors.text }}>
                      {dado.disciplina}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{ color: colors.text }}>
                      {dado.turma}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{ color: colors.text }}>
                      {dado.local}
                    </Text>
                  </Col>
                  <Col style={styles.cell1}>
                    <Text selectable style={{ color: colors.text }}>
                      {dado.stiuacao}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Grid>
          </ScrollView>
          <View style={{ paddingTop: 20 }} />
          <ScrollView horizontal={true}>
            <Grid style={{ paddingBottom: 10 }}>
              <Row>
                <Col style={styles.cellHorario}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Horário
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Segunda
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Terça
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Quarta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Quinta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Sexta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text
                    selectable
                    style={{ fontWeight: "bold", color: "#222" }}
                  >
                    Sábado
                  </Text>
                </Col>
              </Row>
              {dadosHorarios.map((dado: any) => (
                <Row key={key++}>
                  {dado.map((tes: any, index: any) => (
                    <Row
                      key={key++}
                      style={[styles.cell2, { width: index === 0 ? 100 : 80 }]}
                    >
                      <Text selectable style={[{ color: colors.text }]}>
                        {tes}
                      </Text>
                    </Row>
                  ))}
                </Row>
              ))}
            </Grid>
          </ScrollView>
          <Text
            selectable
            style={{
              fontWeight: "bold",
              paddingBottom: 10,
              color: colors.text,
              fontSize: 20,
            }}
          >
            {gravacao.replace(/\t/g, "")}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: "100%",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cellDois: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  cellHorario: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cellHorarioText: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cell1: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    height: "100%",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  cell2: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
