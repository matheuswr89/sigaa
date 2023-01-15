import {useTheme} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export type PropsGrupo = {
  grupos: any;
};

const Grupo: React.FC<PropsGrupo> = ({grupos}) => {
  const {colors} = useTheme();

  const alunos = grupos.alunos;
  let allAlunos = [];
  let id = 0;
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
  return (
    <ScrollView>
      <Text style={[styles.titulo, {color: colors.text}]}>
        {grupos.titulo.split(':')[0] + ': ' + grupos.titulo.split(':')[1]}
      </Text>
      <Text style={[styles.titulo, {color: colors.text}]}>
        {grupos.num.split(':')[0] + ': ' + grupos.num.split(':')[1] + '\n'}
      </Text>
      {allAlunos.map((prof: any) => (
        <View style={styles.card} key={id++}>
          <Text selectable style={styles.menuItemText}>
            {prof.descricao}
          </Text>
        </View>
      ))}
    </ScrollView>
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

export default Grupo;
