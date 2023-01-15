import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';

export type PropsParticipantes = {
  participantes: any;
};

const Participantes: React.FC<PropsParticipantes> = ({participantes}) => {
  const {colors} = useTheme();

  const professor = participantes.professores;
  const alunos = participantes.alunos;
  let allAlunos = [];
  for (let al of alunos) {
    let teste = al.descricao.split('\n');
    let string = '';
    for (let i = 0; i < teste.length; i++) {
      if (teste[i].length > 0) {
        if (i === 0) string += teste[i] + '\n\n';
        else if (i === teste.length - 1) string += teste[i];
        else string += teste[i] + '\n';
      }
    }
    allAlunos.push({descricao: string});
  }
  let id = 0;
  return (
    <View>
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        Professores:
      </Text>
      {professor.map((prof: any) => (
        <View style={styles.card} key={id++}>
          <Text selectable style={styles.menuItemText}>
            {prof.descricao}
          </Text>
        </View>
      ))}
      <Text selectable style={[styles.titulo, {color: colors.text}]}>
        Alunos:
      </Text>
      {allAlunos.map((prof: any) => (
        <View style={styles.card} key={id++}>
          <Text selectable style={styles.menuItemText}>
            {prof.descricao}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#CFDCEF',
    borderRadius: 6,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Participantes;
