import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';

export type PropsNotas = {
  notas: any;
};

const Notas: React.FC<PropsNotas> = ({notas}) => {
  const {colors} = useTheme();
  let keys = 0;
  const teste = notas.avaliacoes;
  const materia = notas.materia.split('- Turma');
  const situacao = notas.situacao === 'APR' ? 'Aprovado' : 'Reprovado';
  let id = 0;
  let avaliacao: any = [],
    descrAv: any = [],
    peso: any = [],
    valor: any = [];
  for (let ava of teste) {
    avaliacao.push(ava.avaliacao);
    descrAv.push(ava.descricao);
    peso.push(ava.peso);
    valor.push(ava.valor);
  }
  avaliacao.push('Resultado');
  avaliacao.push('Faltas');
  let display: any = [];
  notas.notas.map((inf: any) => {
    display.push(inf);
  });
  return (
    <ScrollView style={styles.container1}>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        {materia[0]}
      </Text>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        Turma{materia[1]}
      </Text>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        Situação: {situacao}
      </Text>
      <ScrollView horizontal={true}>
        <Grid>
          {avaliacao.map((ava: any, index: number) => (
            <Col key={ava + id++}>
              <Row style={styles.cell}>
                <Text selectable style={{color: '#222', fontWeight: 'bold'}}>
                  {ava}
                </Text>
              </Row>
              <Row style={styles.cell1}>
                <Text selectable style={{color: colors.text}}>
                  {display[index]}
                </Text>
              </Row>
            </Col>
          ))}
        </Grid>
      </ScrollView>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        Legenda:
      </Text>
      {descrAv.map((descr: any, index: number) => (
        <Text
          selectable
          style={[styles.titulo1, {color: colors.text}]}
          key={avaliacao[index] + id++ + keys++}>
          {avaliacao[index]}: {descr}{' '}
          {peso[index] ? '| Peso: ' + peso[index] : ''}
          {valor[index] ? '| Valor: ' + valor[index] : ''}
        </Text>
      ))}
      <Text selectable style={[styles.datahora, {color: colors.text}]}>
        {notas.dataAtual}
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titulo1: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
  container1: {
    height: '100%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',

    paddingTop: 10,
  },
  datahora: {
    fontSize: 20,
    fontWeight: 'bold',

    paddingTop: 10,
    paddingBottom: 50,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#C4D2EB',
    flex: 1,
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell1: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aviso: {
    fontSize: 15,
    color: '#FF2929',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notas;
