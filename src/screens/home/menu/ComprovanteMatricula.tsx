import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HTMLElement} from 'node-html-parser';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {comprovante} from '../../../api/comprovante';
import {parseTableHorarios, set} from '../../../utils';
import {Loading} from '../../Loading';

export default function ConsultarMatricula(
  props: NativeStackScreenProps<any, any>,
) {
  const controller = new AbortController();

  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const route = useRoute();
  const {colors} = useTheme();
  const dadosUser: any = [];
  const dadosDisciplines: any = [];
  const {navigation, wrapper}: any = route.params;
  let tableDados: any;
  let tableDisciplinas: any;
  let tableHorarios: any;
  let emissao: any;
  let gravacao: any = '';
  let script: any;
  let dadosHorarios: any = [];

  useEffect(() => {
    comprovante(wrapper, navigation, setLoading, setHtml, controller);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
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
    if (
      html.querySelector("table[class='visualizacao bg-claro']") &&
      html.querySelector("table[class='listagem']") &&
      html.querySelector("table[class='formulario']")
    ) {
      tableDados = html.querySelector("table[class='visualizacao bg-claro']");
      tableDisciplinas = html.querySelector("table[class='listagem']");
      tableHorarios = html.querySelector("table[class='formulario']");
      emissao = html.querySelector('span.dataAtual').textContent.trim();
      gravacao = html
        .querySelector('div[style="color: gray; text-align: center"]')
        .textContent.trim();
      script = html.getElementsByTagName('script')[4].innerHTML;

      dadosHorarios = parseTableHorarios(tableHorarios, script);

      tableDados.querySelectorAll('tr').map((dados: any) => {
        const value = dados.querySelector('th').textContent.trim();
        const text = dados
          .querySelector("td[style='text-align: left;']")
          .textContent.trim();
        dadosUser.push(value + ' ' + text);
      });

      tableDisciplinas.querySelectorAll('tbody > tr').map((disci: any) => {
        const disicplinas = disci.querySelectorAll('td');
        for (let i = 0; i < disicplinas.length; i++) {
          const disciplina = disicplinas[i].textContent.trim();
          i += 1;
          const turma = disicplinas[i].textContent.trim();
          i += 1;
          const local = disicplinas[i].textContent.trim();
          i += 1;
          const stiuacao = disicplinas[i].textContent.trim();
          dadosDisciplines.push({
            disciplina,
            turma,
            local,
            stiuacao,
          });
        }
      });
    }
  }
  return (
    <SafeAreaView style={[{padding: 16, height: '100%'}]}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '70%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && (
        <ScrollView>
          <Text selectable style={{fontWeight: 'bold', color: colors.text}}>
            {emissao}
          </Text>
          {dadosUser.map((dado: any) => (
            <Text
              selectable
              style={{fontWeight: 'bold', color: colors.text}}
              key={dado}>
              {dado}
            </Text>
          ))}
          <View style={{paddingTop: 20}} />
          <ScrollView horizontal={true}>
            <Grid style={{paddingBottom: 10}}>
              <Row>
                <Col style={styles.cell}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Componente Curricular
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Turma
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Local
                  </Text>
                </Col>
                <Col style={styles.cell}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Situação
                  </Text>
                </Col>
              </Row>
              {dadosDisciplines.map((dado: any) => (
                <Row key={dado.disciplina}>
                  <Col style={styles.cell1}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.disciplina}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.turma}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.local}
                    </Text>
                  </Col>
                  <Col style={styles.cell1}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.stiuacao}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Grid>
          </ScrollView>
          <View style={{paddingTop: 20}} />
          <ScrollView horizontal={true}>
            <Grid style={{paddingBottom: 10}}>
              <Row>
                <Col style={styles.cellHorario}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Horário
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Segunda
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Terça
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Quarta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Quinta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Sexta
                  </Text>
                </Col>
                <Col style={styles.cellDois}>
                  <Text selectable style={{fontWeight: 'bold', color: '#222'}}>
                    Sábado
                  </Text>
                </Col>
              </Row>
              {dadosHorarios.map((dado: any) => (
                <Row key={dado.horario}>
                  <Col style={styles.cellHorarioText}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.horario}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.segunda.replace(/\n/g, '')}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.terca.replace(/\n/g, '')}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.quarta.replace(/\n/g, '')}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.quinta.replace(/\n/g, '')}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.sexta.replace(/\n/g, '')}
                    </Text>
                  </Col>
                  <Col style={styles.cell2}>
                    <Text selectable style={{color: colors.text}}>
                      {dado.sabado.replace(/\n/g, '')}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Grid>
          </ScrollView>
          <Text
            selectable
            style={{fontWeight: 'bold', paddingBottom: 10, color: colors.text}}>
            {gravacao.replace(/\t/g, '')}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: '100%',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellDois: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellHorario: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellHorarioText: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell1: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: '100%',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell2: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});