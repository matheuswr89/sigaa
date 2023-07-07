import { useBackHandler } from '@react-native-community/hooks';
import { useRoute, useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { notasMedioAction } from '../../../api/notasMedio';
import { Loading } from '../../../components/Loading';
import { global } from '../../../global';
import { handleBackButtonClick } from '../../../utils/globalUtil';
import { parseDados, parseNotas } from './util';

export default function NotasMedio(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();

  const route = useRoute();
  const { colors } = useTheme();
  const [html, setHtml] = useState<HTMLElement>();
  const [loading, setLoading] = useState(true);

  const { json, javax, navigation }: any = route.params;
  useEffect(() => {
    props.navigation.setOptions({ title: props.route.params?.name });
    notasMedioAction(json, javax, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  let notas: any = [];
  let dados: any[] = [];
  if (html) {
    notas = parseNotas(html, navigation);
    dados = parseDados(html, navigation);
  }
  return (
    <SafeAreaView style={global.container2}>
      {loading && <Loading />}
      {!loading && (
        <ScrollView>
          {dados.length > 0 &&
            dados.map(content => (
              <Text selectable style={[styles.titulo, { color: colors.text }]}>
                {content}
              </Text>
            ))}
          <ScrollView horizontal={true}>
            <Grid style={{ paddingBottom: 10 }}>
              <Row>
                <Col style={styles.cell21}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    Disciplina
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    1° BIM
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    1° REC
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    2° BIM
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    2° REC
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    3° BIM
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    3° REC
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    4° BIM
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    4° REC
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    Prova Final
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    Faltas
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    Final
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text
                    selectable
                    style={{ color: '#222', fontWeight: 'bold' }}
                  >
                    Situação
                  </Text>
                </Col>
              </Row>
              {!loading &&
                html &&
                notas.map((ava: any) => (
                  <Row key={ava.disciplina}>
                    <Col style={styles.cell2}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.disciplina}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.bimestre1}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.recBimestre1}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.bimestre2}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.recBimestre2}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.bimestre3}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.recBimestre3}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.bimestre4}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.recBimestre4}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.provaFinal}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.faltas}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.final}
                      </Text>
                    </Col>
                    <Col style={styles.cell1}>
                      <Text selectable style={{ color: colors.text }}>
                        {ava.situacao}
                      </Text>
                    </Col>
                  </Row>
                ))}
            </Grid>
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: 60,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell21: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: 60,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell1: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: 60,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell2: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: 60,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
