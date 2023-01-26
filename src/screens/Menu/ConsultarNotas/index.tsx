import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";
import { redirectScreen } from "../../../api/menu";
import { Loading } from "../../../components/Loading";
import { global } from "../../../global";
import { handleBackButtonClick } from "../../../utils/globalUtil";
import { parseNotas, parseNotasMedio } from "./util";

export default function ConsultarNotas() {
  const controller = new AbortController();

  const route = useRoute();
  const { colors } = useTheme();
  const [html, setHtml] = useState<HTMLElement>();
  const [loading, setLoading] = useState(false);
  const { wrapper, navigation, tipoAluno }: any = route.params;
  let notas: any;
  let notasMedio: any;
  let javax: any;
  useEffect(() => {
    redirectScreen(
      "Consultar Notas",
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
    notas = parseNotas(html);
    if (tipoAluno === "medio") {
      notasMedio = parseNotasMedio(html);
      javax = html.querySelector('input[name="javax.faces.ViewState"]')
        ?.attributes.value;
    }
  }
  const action = (json: any) =>
    navigation.navigate("NotasMedio", {
      json,
      javax,
      navigation,
      name: json.ano,
    });
  let key = 0;
  return (
    <SafeAreaView style={global.container}>
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
      <ScrollView>
        {!loading &&
          html &&
          tipoAluno !== "medio" &&
          notas.map((nota: any) => (
            <View key={nota.ano}>
              <Text
                selectable
                style={[styles.textLogin, { color: colors.text }]}
              >
                Ano: {nota.ano}
              </Text>
              <ScrollView horizontal>
                <View key={nota.ano} style={{ paddingBottom: 10 }}>
                  <Grid>
                    <Row>
                      <Col style={styles.cell}>
                        <Text
                          selectable
                          style={{ color: "#222", fontWeight: "bold" }}
                        >
                          Disciplina
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{ color: "#222", fontWeight: "bold" }}
                        >
                          Unidade 1
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{ color: "#222", fontWeight: "bold" }}
                        >
                          Recuperação
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{ color: "#222", fontWeight: "bold" }}
                        >
                          Resultado
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{ color: "#222", fontWeight: "bold" }}
                        >
                          Situação
                        </Text>
                      </Col>
                    </Row>

                    {nota.disciplinas.map((dado: any) => (
                      <Row key={key++}>
                        <Col style={styles.cell1}>
                          <Text selectable style={{ color: colors.text }}>
                            {dado[0]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{ color: colors.text }}>
                            {dado[1]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{ color: colors.text }}>
                            {dado[2]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{ color: colors.text }}>
                            {dado[3]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{ color: colors.text }}>
                            {dado[4]}
                          </Text>
                        </Col>
                      </Row>
                    ))}
                  </Grid>
                </View>
              </ScrollView>
              <View
                key={key++}
                style={{
                  marginTop: 20,
                  borderBottomColor: colors.text,
                  borderBottomWidth: 2,
                }}
              />
            </View>
          ))}
        {!loading &&
          html &&
          tipoAluno === "medio" &&
          notasMedio.map((json: any) => (
            <TouchableOpacity
              key={json.ano}
              style={[
                global.menuItem,
                {
                  backgroundColor:
                    json.situacao === "APROVADO"
                      ? "#66E785"
                      : json.situacao === "MATRICULADO"
                      ? "#FDF54C"
                      : "#FD4C4C",
                },
              ]}
              onPress={() => action(json)}
            >
              <Text selectable style={global.menuItemText}>
                {json.ano} - {json.situacao}
              </Text>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textLogin: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
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
  cell12: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cell2: {
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
});
