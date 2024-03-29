import { useBackHandler } from '@react-native-community/hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute, useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDisciplina } from '../../api/disciplinas';
import { getDisciplinaAnteriores } from '../../api/disciplinasAnteriores';
import { Loading } from '../../components/Loading';
import {
  handleBackButtonClick,
  recordErrorFirebase,
} from '../../utils/globalUtil';
import HomeDisciplina from './HomeDisciplina';
import MenuDisciplina from './MenuDisciplina';
import { menuDisicplina, menuDisicplinaDrop } from './util';

const TabDisciplina = createMaterialTopTabNavigator();

export default function Disciplina(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<HTMLElement>();
  const { colors } = useTheme();
  const route = useRoute();
  const { navigation, tipoAluno, tipo, allTurmasParse, disciplina, link }: any =
    route.params;
  useEffect(() => {
    props.navigation.setOptions({ title: props.route.params?.name });
    if (tipo === 1)
      getDisciplina(disciplina, navigation, setLoading, setHtml, controller);
    else
      getDisciplinaAnteriores(
        disciplina,
        navigation,
        allTurmasParse,
        setLoading,
        setHtml,
        controller,
      );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  const areaDisciplina = html;
  let menuCode;
  let javax;
  let menuCode1;
  let javaxMenuDrop;
  let menuDisc: any;
  if (html) {
    try {
      menuCode = html.querySelectorAll('div#barraEsquerda > div > div');
      javax = html.querySelector(
        "form#formMenu > input[name='javax.faces.ViewState']",
      )?.attributes.value;
      menuCode1 = html.querySelectorAll('div#barraEsquerda > div')[0]?.id;

      javaxMenuDrop = html.querySelector(
        "form#formMenuDrop > input[name='javax.faces.ViewState']",
      )?.attributes.value;
      menuDisc = javaxMenuDrop
        ? menuDisicplinaDrop({ javaxMenuDrop })
        : menuDisicplina({ menuCode, javax, menuCode1, tipoAluno });
    } catch (e) {
      recordErrorFirebase(e);
      navigation.goBack();
    }
  }
  return (
    <>
      {loading && <Loading />}
      {!loading && html && (
        <TabDisciplina.Navigator
          key={3}
          backBehavior="none"
          tabBarPosition="bottom"
          initialRouteName="Home Disciplina"
          screenOptions={({ route }: any) => ({
            tabBarStyle: {
              justifyContent: 'center',
            },
            tabBarLabelStyle: {
              fontSize: 10,
              margin: 0,
              padding: 0,
              width: 1000,
            },
            tabBarIcon: ({ focused, color, size }: any) => {
              let iconName = '';

              if (route.name === 'Home Disciplina') {
                iconName = 'book';
              } else if (route.name === 'Menu Disciplina') {
                iconName = 'bars';
              }
              return (
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? colors.text : 'gray'}
                  style={{ textAlign: 'center' }}
                />
              );
            },
          })}
        >
          <TabDisciplina.Screen
            name="Menu Disciplina"
            children={() => (
              <MenuDisciplina
                menuDisic={menuDisc}
                tipoAluno={tipoAluno}
                navigation={navigation}
              />
            )}
          />
          <TabDisciplina.Screen
            name="Home Disciplina"
            children={() => (
              <HomeDisciplina
                html={areaDisciplina}
                navigation={navigation}
                setLoading={setLoading}
              />
            )}
          />
        </TabDisciplina.Navigator>
      )}
    </>
  );
}
