import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {redirectScreen} from '../api/menu';
import {menuDisciplinaAction} from '../api/menuDisciplina';
import {
  atestadoMatricula,
  mapafrequencia,
  notasDisciplinas,
  parseForuns,
  parseGrupo,
  parseTarefas,
  participantes,
  set,
} from '../utils';
import Foruns from './home/disciplina/forum/Foruns';
import Frequencia from './home/disciplina/Frequencia';
import Grupo from './home/disciplina/Grupo';
import Notas from './home/disciplina/Notas';
import Participantes from './home/disciplina/Participantes';
import Tarefas from './home/disciplina/Tarefas';
import Atestado from './home/menu/Atestado';
import {Loading} from './Loading';

export default function MenuDisciplinaScreen(
  props: NativeStackScreenProps<any, any>,
) {
  const controller = new AbortController();
  const {navigation}: any = props;
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const [tipoAcao, setTipoAcao]: any = useState<string>('');
  const [tipoAcao1, setTipoAcao1]: any = useState<string>('');
  const {wrapper, tipoAluno, tipo, menu}: any = route.params;
  let json: any = null;

  useEffect(() => {
    props.navigation.setOptions({title: props.route.params?.nameScreen.trim()});
    if (tipo === 'menuHome')
      redirectScreen(
        'MenuDisciplinaScreen',
        wrapper,
        setLoading,
        setHtml,
        tipoAluno,
        navigation,
        controller,
      );
    else
      menuDisciplinaAction(
        menu,
        setLoading,
        navigation,
        tipoAluno,
        setHtml,
        setTipoAcao,
        setTipoAcao1,
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
    if (tipoAcao1 === 'prof') {
      if (html.querySelector('div#painel-erros')) {
        let atencao = '';
        if (tipoAcao) atencao = 'O professor ainda não lançou as notas!';
        else atencao = 'Você não possui matricula no periodo atual!';
        json = {
          atencao,
          tipo: 'atestado',
          identificacao: [],
          turmas: [],
        };
      } else if (
        html
          .querySelector('form > fieldset > legend')
          ?.textContent.includes('Mapa')
      )
        json = mapafrequencia(html.querySelector('form > fieldset'));
      else if (
        html
          .querySelector('form > fieldset > legend')
          ?.textContent.includes('Professor')
      )
        json = participantes(html.querySelector('form'), tipoAluno);
      else if (
        html
          .querySelector('form > fieldset > legend')
          ?.textContent.includes('Grupo')
      )
        json = parseGrupo(html.querySelector('form'));
      else if (
        html
          .querySelector('form > fieldset > legend')
          ?.textContent.includes('Tarefa')
      ) {
        json = parseTarefas(
          html.querySelectorAll('table.tarefas > tbody > tr'),
          tipoAluno,
        );
        json['form'] = html.getElementsByTagName('form')[0].attributes.id;
        json['javax.faces.ViewState'] = html.querySelector(
          'input[name="javax.faces.ViewState"]',
        )?.attributes.value;
      } else if (
        html
          .querySelector('form > fieldset > legend')
          ?.textContent.includes('Fóruns')
      ) {
        json = parseForuns(html.querySelectorAll('table.listing'));
        json['javax'] = html.querySelector(
          'input[name="javax.faces.ViewState"]',
        )?.attributes.value;
      }
    } else {
      if (html.querySelector('div#relatorio-container')) {
        json = atestadoMatricula(html.querySelector('div#relatorio-container'));
      } else if (html.querySelector('table.tabelaRelatorio')) {
        json = notasDisciplinas(html, tipoAluno);
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '60%',
          }}>
          <Loading />
        </View>
      )}
      {!loading &&
        html &&
        (json === null ? (
          <Text selectable style={styles.textError}>
            Erro ao carregar!
          </Text>
        ) : json.tipo === 'atestado' ? (
          <Atestado atestado={json} />
        ) : json?.tipo === 'participantes' ? (
          <Participantes participantes={json} />
        ) : json?.tipo === 'frequencia' ? (
          <Frequencia frequencia={json} />
        ) : json?.tipo === 'tarefas' ? (
          <Tarefas tarefas={json} navigation={navigation} />
        ) : json?.tipo === 'foruns' ? (
          <Foruns foruns={json} navigation={navigation} />
        ) : json?.tipo === 'grupo' ? (
          <Grupo grupos={json} />
        ) : (
          <Notas notas={json} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    paddingBottom: 50,
    height: '100%',
  },
  textError: {
    color: '#E72727',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
