import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { BackHandler, Linking, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { redirectScreen } from "../../../api/menu";
import { Loading } from "../../../components/Loading";
import { global } from "../../../global";
import { set } from "../../../utils/globalUtil";
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
  let emissao, atencao, identificacao, turmas;
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
              {ind.replace(/\s\s/g, "")}
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
                    <Text
                      selectable
                      style={[styles.cell3, { color: colors.text }]}
                    >
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
                    <Text
                      selectable
                      style={[styles.cell3, { color: colors.text }]}
                    >
                      {ava.disciplina
                        .replace("\n", "")
                        .replace(/\t/g, "")
                        .replace(/\r/g, "")}
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
                    <Text
                      selectable
                      style={[styles.cell3, { color: colors.text }]}
                    >
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
                    <Text
                      selectable
                      style={[styles.cell3, { color: colors.text }]}
                    >
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
                    <Text
                      selectable
                      style={[styles.cell3, { color: colors.text }]}
                    >
                      {ava.horario}
                    </Text>
                  </Row>
                ))}
              </Col>
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
  cell3: {},
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
