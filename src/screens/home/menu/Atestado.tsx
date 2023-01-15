import {useTheme} from '@react-navigation/native';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {global} from '../../../global';

export type PropsAtestado = {
  atestado: any;
};

const Atestado: React.FC<PropsAtestado> = ({atestado}) => {
  const emissao = atestado.emissao;
  const atencao = atestado.atencao
    .replace(/\n/g, '')
    .split('acessehttps://sig.ifsudestemg.edu.br/sigaa/documentos/');
  const {colors} = useTheme();

  const identificacao = atestado.identificacao;
  const turmas = atestado.turmas;
  let array = [];
  for (let i = 0; i < identificacao.length; i++) {
    array.push(identificacao[i] + ' ' + identificacao[i + 1]);
    i = i + 1;
  }
  return (
    <View style={[{flex: 1}]}>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        {emissao}
      </Text>
      {array.map((ind: any) => (
        <Text
          selectable
          style={[styles.titulo, {color: colors.text}]}
          key={ind}>
          {ind.replace(/\s\s/g, '')}
        </Text>
      ))}
      {turmas.length > 0 && (
        <Text selectable style={[styles.titulo, {color: colors.text}]}>
          Turmas matriculadas: {turmas.length}
        </Text>
      )}
      <ScrollView horizontal={true}>
        <Grid>
          <Col size={35}>
            {turmas.length > 0 && (
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  Cód.
                </Text>
              </Row>
            )}
            {turmas.map((ava: any) => (
              <Row style={styles.cell2} key={ava.horario}>
                <Text selectable style={[styles.cell3, {color: colors.text}]}>
                  {ava.cod}
                </Text>
              </Row>
            ))}
          </Col>
          <Col size={10}>
            {turmas.length > 0 && (
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  Componentes Curriculares/Docentes
                </Text>
              </Row>
            )}
            {turmas.map((ava: any) => (
              <Row style={styles.cell2} key={ava.horario}>
                <Text selectable style={[styles.cell3, {color: colors.text}]}>
                  {ava.disciplina
                    .replace('\n', '')
                    .replace(/\t/g, '')
                    .replace(/\r/g, '')}
                </Text>
              </Row>
            ))}
          </Col>
          <Col size={30}>
            {turmas.length > 0 && (
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  Turma
                </Text>
              </Row>
            )}
            {turmas.map((ava: any) => (
              <Row style={styles.cell2} key={ava.horario}>
                <Text selectable style={[styles.cell3, {color: colors.text}]}>
                  {ava.turma}
                </Text>
              </Row>
            ))}
          </Col>
          <Col size={50}>
            {turmas.length > 0 && (
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  Status
                </Text>
              </Row>
            )}
            {turmas.map((ava: any) => (
              <Row style={styles.cell2} key={ava.horario}>
                <Text selectable style={[styles.cell3, {color: colors.text}]}>
                  {ava.status}
                </Text>
              </Row>
            ))}
          </Col>
          <Col size={50}>
            {turmas.length > 0 && (
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  Horário
                </Text>
              </Row>
            )}
            {turmas.map((ava: any) => (
              <Row style={styles.cell2} key={ava.horario}>
                <Text selectable style={[styles.cell3, {color: colors.text}]}>
                  {ava.horario}
                </Text>
              </Row>
            ))}
          </Col>
        </Grid>
      </ScrollView>
      {turmas.length > 0 && (
        <Text selectable style={[styles.menuItemText, {color: colors.text}]}>
          {atencao[0]}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://sig.ifsudestemg.edu.br/sigaa/documentos')
            }>
            <Text
              selectable
              style={[global.link, {fontSize: 17, lineHeight: 16}]}>
              clique aqui
            </Text>
          </TouchableOpacity>
          {atencao[1].replace('informando', 'e informe')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell2: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cell3: {
    height: 80,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  atencao: {
    color: '#E72727',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aviso: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Atestado;
