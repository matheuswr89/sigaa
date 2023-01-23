import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import { global } from "../../../../global";
import { set } from "../../../../utils/globalUtil";
import { parseFrequencia } from "./util";

const Frequencia = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { colors } = useTheme();
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { menu }: any = route.params;
  let descricao, descricaoFreq, frequencias: any;

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
    const frequencia: any = parseFrequencia(html);
    descricao = frequencia.descricao;
    descricaoFreq = frequencia.descricaoFreq;
    frequencias = frequencia.frequencias;
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
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            {descricao}
          </Text>
          <Grid>
            <Col size={50}>
              <Row style={styles.cell}>
                <Text selectable style={{ color: "#222", fontWeight: "bold" }}>
                  Data
                </Text>
              </Row>
              {frequencias.map((ava: any) => (
                <Row style={styles.cell1} key={ava.data}>
                  <Text selectable style={{ color: colors.text }}>
                    {ava.data}
                  </Text>
                </Row>
              ))}
            </Col>
            <Col size={50}>
              <Row style={styles.cell}>
                <Text selectable style={{ color: "#222", fontWeight: "bold" }}>
                  Situação
                </Text>
              </Row>
              {frequencias.map((ava: any) => (
                <Row style={styles.cell1} key={ava.data}>
                  <Text selectable style={{ color: colors.text }}>
                    {ava.situacao}
                  </Text>
                </Row>
              ))}
            </Col>
          </Grid>
          <Text selectable style={[styles.descr, { color: colors.text }]}>
            {descricaoFreq}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  descr: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#C4D2EB",
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cell1: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Frequencia;
