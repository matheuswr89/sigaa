import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HTMLElement} from 'node-html-parser';
import {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {acao} from '../../../api/disciplinas';
import {navegaParaDisciplina} from '../../../api/disciplinasAnteriores';
import {menuDisicplina, menuDisicplinaDrop, set} from '../../../utils';
import {Loading} from '../../Loading';
import HomeDisciplina from './Homedisciplina';
import MenuDisciplina from './MenuDisciplina';

const TabDisciplina = createMaterialTopTabNavigator();

export default function Disciplina(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();

  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const {colors} = useTheme();
  const route = useRoute();
  const {name, navigation, tipoAluno, tipo, allTurmasParse, disciplina}: any =
    route.params;
  useEffect(() => {
    props.navigation.setOptions({title: props.route.params?.name});
    if (tipo === 1)
      acao(disciplina, navigation, tipoAluno, setLoading, setHtml, controller);
    else
      navegaParaDisciplina(
        disciplina,
        navigation,
        tipoAluno,
        allTurmasParse,
        setLoading,
        setHtml,
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

  const areaDisciplina = html;
  let menuCode;
  let javax;
  let menuCode1;
  let javaxMenuDrop;
  let menuDisc: any;
  if (html) {
    menuCode = html.querySelectorAll('div#barraEsquerda > div > div');
    javax = html.querySelector(
      "form#formMenu > input[name='javax.faces.ViewState']",
    )?.attributes.value;
    menuCode1 = html.querySelectorAll('div#barraEsquerda > div')[0]?.id;

    javaxMenuDrop = html.querySelector(
      "form#formMenuDrop > input[name='javax.faces.ViewState']",
    )?.attributes.value;
    menuDisc = javaxMenuDrop
      ? menuDisicplinaDrop({javaxMenuDrop})
      : menuDisicplina({menuCode, javax, menuCode1, tipoAluno});
  }
  return (
    <>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '60%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html && (
        <TabDisciplina.Navigator
          key={3}
          backBehavior="none"
          tabBarPosition="bottom"
          initialRouteName="Disciplina"
          screenOptions={({route}: any) => ({
            tabBarStyle: {
              paddingBottom: 5,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              margin: 0,
              padding: 0,
              width: 1000,
            },
            tabBarIcon: ({focused, color, size}: any) => {
              let iconName = '';

              if (route.name === 'Disciplina') {
                iconName = 'book';
              } else if (route.name === 'Menu Disciplina') {
                iconName = 'bars';
              }
              return (
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? colors.text : 'gray'}
                  style={{textAlign: 'center'}}
                />
              );
            },
          })}>
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
            name="Disciplina"
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
