import { useBackHandler } from '@react-native-community/hooks';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { menuDisciplinaAction } from '../../../../api/menuDisciplina';
import { Loading } from '../../../../components/Loading';
import Tarefa from '../../../../components/Tarefa';
import { global } from '../../../../global';
import { handleBackButtonClick } from '../../../../utils/globalUtil';
import { parseTarefas } from './util';

const Tarefas = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { menu }: any = route.params;
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<HTMLElement>();
  let tarefas: any;

  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    tarefas = parseTarefas(
      html.querySelectorAll('table.tarefas > tbody > tr'),
      navigation,
    );
    tarefas['form'] = html.getElementsByTagName('form')[0].attributes.id;
    tarefas['javax.faces.ViewState'] = html.querySelector(
      'input[name="javax.faces.ViewState"]',
    )?.attributes.value;
  }
  return (
    <SafeAreaView style={global.container2}>
      {loading && <Loading />}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: 10 }}>
          {tarefas.vazio && (
            <Text selectable style={styles.aviso}>
              {tarefas.vazio}
            </Text>
          )}
          <Tarefa
            tarefas={tarefas.individual}
            javax={tarefas['javax.faces.ViewState']}
            form={tarefas.form}
            navigation={navigation}
          />
          <Tarefa
            tarefas={tarefas.grupo}
            javax={tarefas['javax.faces.ViewState']}
            form={tarefas.form}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  aviso: {
    flex: 1,
    fontSize: 20,
    color: '#E56201',
    width: '95%',
  },
});

export default Tarefas;
