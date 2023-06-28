import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { redirectScreen } from "../../../api/menu";
import { Loading } from "../../../components/Loading";
import { global } from "../../../global";
import { handleBackButtonClick, replaceAll } from "../../../utils/globalUtil";
import { atestadoMatricula } from "./util";

const Atestado = (props: NativeStackScreenProps<any, any>) => {
  const controller = new AbortController();
  const { navigation }: any = props;
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const { wrapper, tipoAluno }: any = route.params;
  const { colors } = useTheme();

  let atestado: any;
  let array = [];
  let emissao,
    atencao,
    identificacao,
    turmas,
    horarios,
    diasSemana,
    key = 0;
  useEffect(() => {
    redirectScreen(
      "MenuDisciplinaScreen",
      wrapper,
      setLoading,
      setHtml,
      tipoAluno,
      navigation,
      controller
    );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    atestado = atestadoMatricula(html);
    emissao = atestado.emissao;
    atencao = atestado.atencao
      .replace(/\n/g, "")
      .split("acessehttps://sig.ifsudestemg.edu.br/sigaa/documentos/");

    identificacao = atestado.identificacao;
    turmas = atestado.turmas;
    for (let i = 0; i < identificacao.length; i++) {
      array.push(identificacao[i] + " " + identificacao[i + 1]);
      i = i + 1;
    }
    horarios = atestado.horarios;
    diasSemana = horarios[0];
    horarios.shift();
  }
  return (
    <SafeAreaView style={[global.container, { marginTop: -30 }]}>
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
        <ScrollView>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            {emissao}
          </Text>
          {array.map((ind: any) => (
            <Text
              selectable
              style={[styles.titulo, { color: colors.text }]}
              key={ind}
            >
              {replaceAll(ind)}
            </Text>
          ))}
          {turmas.length > 0 && (
            <Text selectable style={[styles.titulo, { color: colors.text }]}>
              Turmas matriculadas: {turmas.length}
            </Text>
          )}
          <ScrollView horizontal={true}>
            <Grid style={{ margin: 5 }}>
              <Col size={35}>
                {turmas.length > 0 && (
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      Cód.
                    </Text>
                  </Row>
                )}
                {turmas.map((ava: any) => (
                  <Row style={styles.cell2} key={ava.horario}>
                    <Text selectable style={[{ color: colors.text }]}>
                      {ava.cod}
                    </Text>
                  </Row>
                ))}
              </Col>
              <Col size={10}>
                {turmas.length > 0 && (
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      Componentes Curriculares/Docentes
                    </Text>
                  </Row>
                )}
                {turmas.map((ava: any) => (
                  <Row style={styles.cell2} key={ava.horario}>
                    <Text selectable style={[{ color: colors.text }]}>
                      {replaceAll(ava.disciplina)}
                    </Text>
                  </Row>
                ))}
              </Col>
              <Col size={30}>
                {turmas.length > 0 && (
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      Turma
                    </Text>
                  </Row>
                )}
                {turmas.map((ava: any) => (
                  <Row style={styles.cell2} key={ava.horario}>
                    <Text selectable style={[{ color: colors.text }]}>
                      {ava.turma}
                    </Text>
                  </Row>
                ))}
              </Col>
              <Col size={50}>
                {turmas.length > 0 && (
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      Status
                    </Text>
                  </Row>
                )}
                {turmas.map((ava: any) => (
                  <Row style={styles.cell2} key={ava.horario}>
                    <Text selectable style={[{ color: colors.text }]}>
                      {ava.status}
                    </Text>
                  </Row>
                ))}
              </Col>
              <Col size={50}>
                {turmas.length > 0 && (
                  <Row style={styles.cell}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      Horário
                    </Text>
                  </Row>
                )}
                {turmas.map((ava: any) => (
                  <Row style={styles.cell2} key={ava.horario}>
                    <Text selectable style={[{ color: colors.text }]}>
                      {ava.horario}
                    </Text>
                  </Row>
                ))}
              </Col>
            </Grid>
          </ScrollView>
          <ScrollView horizontal={true}>
            <Grid style={{ margin: 5 }}>
              <Row>
                {diasSemana.map((ava: any) => (
                  <Row key={ava} style={[styles.cell, { width: 90 }]}>
                    <Text
                      selectable
                      style={{ color: "#222", fontWeight: "bold" }}
                    >
                      {ava}
                    </Text>
                  </Row>
                ))}
              </Row>
              {horarios.map((ava: any) => (
                <Row key={key++}>
                  {ava.map((tes: any) => (
                    <Row key={key++} style={[styles.cell2, { width: 90 }]}>
                      <Text selectable style={[{ color: colors.text }]}>
                        {tes}
                      </Text>
                    </Row>
                  ))}
                </Row>
              ))}
            </Grid>
          </ScrollView>
          {turmas.length > 0 && (
            <Text
              selectable
              style={[styles.menuItemText, { color: colors.text }]}
            >
              {atencao[0]}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://sig.ifsudestemg.edu.br/sigaa/documentos"
                  )
                }
              >
                <Text
                  selectable
                  style={[global.link, { fontSize: 17, lineHeight: 16 }]}
                >
                  clique aqui
                </Text>
              </TouchableOpacity>
              {atencao[1].replace("informando", "e informe")}
            </Text>
          )}
          {turmas.length === 0 && (
            <View style={styles.aviso}>
              <Text selectable style={styles.atencao}>
                {atencao}
              </Text>
              <Text selectable style={styles.atencao}>
                Volte ao menu principal!
              </Text>
            </View>
          )}
          <Text selectable></Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cell: {
    borderWidth: 1,
    height: 30,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    justifyContent: "center",
    alignItems: "center",
  },
  cell2: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 30,
  },
  atencao: {
    color: "#E72727",
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  aviso: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Atestado;
