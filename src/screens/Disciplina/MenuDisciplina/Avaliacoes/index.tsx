import { useBackHandler } from '@react-native-community/hooks';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  let avaliacoes: any;

  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    avaliacoes = parseAvaliacoes(html.querySelector('table.listing'));
  }

  return (
    <SafeAreaView style={global.container2}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '-40%',
          }}
        >
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: -35 }}>
          {avaliacoes.avaliacoes.map((avaliacao: any) => (
            <TouchableOpacity key={avaliacao.descricao} style={global.menuItem}>
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
