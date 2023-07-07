import { useBackHandler } from '@react-native-community/hooks';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { menuDisciplinaAction } from '../../../../api/menuDisciplina';
import { Loading } from '../../../../components/Loading';
import { global } from '../../../../global';
import { handleBackButtonClick } from '../../../../utils/globalUtil';
import { parseQuestionarios } from './util';

const Questionarios = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { menu }: any = route.params;
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<HTMLElement>();

  let questionarios: any,
    key = 0;

  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    questionarios = parseQuestionarios(
      html.querySelector('table.listing'),
      navigation,
    );
  }

  return (
    <SafeAreaView style={global.container2}>
      {loading && <Loading />}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: 10 }}>
          {questionarios.questionarios.map((avaliacao: any) => (
            <TouchableOpacity
              key={avaliacao.titulo + key++}
              style={global.menuItem}
              onPress={() => {
                Alert.alert(
                  'Função não implementada!',
                  'O acesso ao questionário é somente pelo site do SIGAA!',
                );
              }}
            >
              <View>
                <Text selectable style={global.tituloCard}>
                  {avaliacao.titulo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Início: {avaliacao.inicio}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Fim: {avaliacao.fim}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Questionarios;
