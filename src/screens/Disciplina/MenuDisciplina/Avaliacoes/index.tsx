import { useBackHandler } from '@react-native-community/hooks';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import {
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
import { parseAvaliacoes } from './util';

const Avaliacoes = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { menu }: any = route.params;
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<HTMLElement>();

  let avaliacoes: any,
    key = 0;

  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    avaliacoes = parseAvaliacoes(
      html.querySelector('table.listing'),
      navigation,
    );
  }

  return (
    <SafeAreaView style={global.container2}>
      {loading && <Loading />}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: 10 }}>
          {avaliacoes.avaliacoes.map((avaliacao: any) => (
            <TouchableOpacity
              accessibilityRole="button"
              key={avaliacao.descricao + key++}
              style={global.menuItem}
            >
              <View>
                <Text selectable style={global.tituloCard}>
                  {avaliacao.descricao}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Data: {avaliacao.data}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Hora: {avaliacao.hora}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Avaliacoes;
