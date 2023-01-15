import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HTMLElement} from 'node-html-parser';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {redirectScreen} from '../../../api/menu';
import {global} from '../../../global';
import {parseNotas, parseNotasMedio, set} from '../../../utils';
import {Loading} from '../../Loading';

export default function ConsultarNotas(
  props: NativeStackScreenProps<any, any>,
) {
  const controller = new AbortController();

  const route = useRoute();
  const {colors} = useTheme();
  const [html, setHtml] = useState<HTMLElement>();
  const [loading, setLoading] = useState(false);
  const {wrapper, navigation, tipoAluno}: any = route.params;
  let notas: any;
  let notasMedio: any;
  let javax: any;
  useEffect(() => {
    redirectScreen(
      'ConsultarNotas',
      wrapper,
      setLoading,
      setHtml,
      tipoAluno,
      navigation,
      controller,
    );
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
    notas = parseNotas(html);
    if (tipoAluno === 'medio') {
      notasMedio = parseNotasMedio(html);
      javax = html.querySelector('input[name="javax.faces.ViewState"]')
        ?.attributes.value;
    }
  }
  const action = (json: any) =>
    navigation.navigate('NotasMedio', {
      json,
      javax,
      navigation,
      name: json.ano,
    });
  let key = 0;
  return (
    <SafeAreaView style={[{padding: 16, height: '100%'}]}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '60%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html && tipoAluno !== 'medio' && (
        <ScrollView style={[styles.container]} key={key++}>
          {notas.map((nota: any) => (
            <View key={nota.ano}>
              <Text selectable style={[styles.textLogin, {color: colors.text}]}>
                Ano: {nota.ano}
              </Text>
              <ScrollView horizontal>
                <View key={nota.ano} style={{paddingBottom: 10}}>
                  <Grid>
                    <Row>
                      <Col style={styles.cell}>
                        <Text
                          selectable
                          style={{color: '#222', fontWeight: 'bold'}}>
                          Disciplina
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{color: '#222', fontWeight: 'bold'}}>
                          Unidade 1
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{color: '#222', fontWeight: 'bold'}}>
                          Recuperação
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{color: '#222', fontWeight: 'bold'}}>
                          Resultado
                        </Text>
                      </Col>
                      <Col style={styles.cell12}>
                        <Text
                          selectable
                          style={{color: '#222', fontWeight: 'bold'}}>
                          Situação
                        </Text>
                      </Col>
                    </Row>

                    {nota.disciplinas.map((dado: any) => (
                      <Row key={key++}>
                        <Col style={styles.cell1}>
                          <Text selectable style={{color: colors.text}}>
                            {dado[0]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{color: colors.text}}>
                            {dado[1]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{color: colors.text}}>
                            {dado[2]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{color: colors.text}}>
                            {dado[3]}
                          </Text>
                        </Col>
                        <Col style={styles.cell2}>
                          <Text selectable style={{color: colors.text}}>
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
        </ScrollView>
      )}
      {!loading && html && tipoAluno === 'medio' && (
        <ScrollView>
          {notasMedio.map((json: any) => (
            <TouchableOpacity
              key={json.ano}
              style={[
                global.menuItem,
                {
                  backgroundColor:
                    json.situacao === 'APROVADO'
                      ? '#66E785'
                      : json.situacao === 'MATRICULADO'
                      ? '#FDF54C'
                      : '#FD4C4C',
                },
              ]}
              onPress={() => action(json)}>
              <Text selectable style={global.menuItemText}>
                {json.ano} - {json.situacao}
              </Text>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -10,
    height: '100%',
  },
  textLogin: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
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
  cell12: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell2: {
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
});
