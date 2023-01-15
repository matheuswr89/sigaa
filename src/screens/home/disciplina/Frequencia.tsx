import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';

export type PropsFrequencia = {
  frequencia: any;
};

const Frequencia: React.FC<PropsFrequencia> = ({frequencia}) => {
  const descricao = frequencia.descricao;
  const descricaoFreq = frequencia.descricaoFreq;
  const frequencias = frequencia.frequencias;
  const {colors} = useTheme();

  return (
    <View>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        {descricao}
      </Text>
      <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
              Data
            </Text>
          </Row>
          {frequencias.map((ava: any) => (
            <Row style={styles.cell1} key={ava.data}>
              <Text selectable style={{color: colors.text}}>
                {ava.data}
              </Text>
            </Row>
          ))}
        </Col>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
              Situação
            </Text>
          </Row>
          {frequencias.map((ava: any) => (
            <Row style={styles.cell1} key={ava.data}>
              <Text selectable style={{color: colors.text}}>
                {ava.situacao}
              </Text>
            </Row>
          ))}
        </Col>
      </Grid>
      <Text selectable style={[styles.descr, {color: colors.text}]}>
        {descricaoFreq}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  descr: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
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
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell1: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Frequencia;
