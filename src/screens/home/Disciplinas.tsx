import {useTheme} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {global} from '../../global';
import {DisciplinasInterface, getAllturmas} from '../../utils';

export type PropsDisciplina = {
  disciplinas: any;
  navigation: any;
  allTurmas: any;
  tipoAluno: string;
  atividades: any;
};

const Disciplinas: React.FC<PropsDisciplina> = ({
  disciplinas,
  navigation,
  allTurmas,
  tipoAluno,
  atividades,
}) => {
  const scrollRef: any = useRef();
  const [visibleAllTurmas, setVisibleAllTurmas] = useState(false);
  const allTurmasParse = getAllturmas(allTurmas.querySelector('div#conteudo'));
  const {colors} = useTheme();

  const turmasAnteriores = () => {
    setVisibleAllTurmas(!visibleAllTurmas);
    scrollRef.current?.scrollTo({x: 1, y: 1, animated: true});
  };
  const disicplinaAtual = (disciplina: DisciplinasInterface) => {
    navigation.navigate('Disciplina1', {
      disciplina,
      navigation,
      tipoAluno,
      name: disciplina.nome,
      tipo: 1,
    });
  };

  const disicplinaAnteriores = (disciplinas: any) => {
    let name = '';
    const split = disciplinas.disciplina.split('-');
    for (let i = 1; i < split.length; i++) {
      if (i < split.length - 1) name += split[i] + ' - ';
      else name += split[i];
    }
    navigation.navigate('Disciplina1', {
      disciplina: disciplinas,
      navigation,
      tipoAluno,
      allTurmasParse,
      name: name,
      tipo: 0,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView ref={scrollRef}>
        {!visibleAllTurmas && disciplinas.length > 0 && (
          <Text selectable style={[styles.text1, {color: colors.text}]}>
            Disciplinas no semestre:
          </Text>
        )}
        {!visibleAllTurmas &&
          disciplinas.length > 0 &&
          disciplinas.map((disciplina: DisciplinasInterface) => (
            <TouchableOpacity
              key={disciplina.id}
              style={global.menuItem}
              onPress={() => disicplinaAtual(disciplina)}>
              <View>
                <Text selectable style={global.menuItemText}>
                  {disciplina.nome}
                </Text>
                {disciplina.horario.split(',').map((horario: any) => (
                  <Text
                    selectable
                    key={horario.trim()}
                    style={styles.menuItemHorario}>
                    {horario.trim()}
                  </Text>
                ))}
              </View>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        {disciplinas.length > 0 && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => turmasAnteriores()}>
            <Text selectable style={styles.btnText}>
              {visibleAllTurmas
                ? 'Ocultar turmas anteriores'
                : 'Mostrar turmas anteriores'}
            </Text>
          </TouchableOpacity>
        )}
        {disciplinas.length === 0 && (
          <Text selectable style={[styles.text1, {color: colors.text}]}>
            Matérias dos períodos anteriores:
          </Text>
        )}
        {(visibleAllTurmas || disciplinas.length === 0) &&
          allTurmasParse.map((disciplina: any) => (
            <View key={disciplina.periodo}>
              <Text selectable style={[styles.text1, {color: colors.text}]}>
                {disciplina.periodo}
              </Text>
              {disciplina.turmasPorPeriodo.map((element: any) => (
                <TouchableOpacity
                  key={element.disciplina}
                  style={global.menuItem}
                  onPress={() => disicplinaAnteriores(element)}>
                  <View>
                    <Text selectable style={global.menuItemText}>
                      {element.disciplina}
                    </Text>
                  </View>
                  <Text selectable style={global.menuItemIcon}>
                    →
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 29,
    height: '100%',
  },
  text1: {
    fontSize: 31,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  menuItemHorario: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    backgroundColor: '#4683DF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default Disciplinas;
