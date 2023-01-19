import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HTMLElement} from 'node-html-parser';
import {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getAllTurmas} from '../../api/getAllTurmas';
import {getHome} from '../../api/getHome';
import {
  Atividades,
  DisciplinasInterface,
  parseAtividades,
  parseDisciplinas,
  set,
} from '../../utils';
import {Loading} from '../Loading';
import Atividades1 from './atividades/Atividades';
import Disciplinas from './Disciplinas';
import Menu from './Menu';
import Perfil from './Proffile';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(false);
  const [html, setHtml]: any = useState<HTMLElement>();
  const [turmasAnteriores, setTurmasAnteriores] = useState<HTMLElement>();
  const {colors} = useTheme();
  const route = useRoute();
  const {html2, navigation, link, vinculos}: any = route.params;
  let disciplinas: DisciplinasInterface[];
  let atividades: Atividades[];
  let tipoAluno = 'graduacao';
  let perfilDocente: any;

  useEffect(() => {
    if (html2) {
      setHtml(html2);
      getAllTurmas(setTurmasAnteriores, setLoading);
    }
    if (link) {
      getHome(link, setHtml, setLoading, setTurmasAnteriores);
    }
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
    if (vinculos.lengt > 0) navigation.goBack();
    else navigation.navigate('Login');
    return true;
  }

  if (html) {
    perfilDocente = html?.querySelector('div#perfil-docente');
    disciplinas = parseDisciplinas(html);
    atividades = parseAtividades(html);
    if (perfilDocente.querySelectorAll('table').length <= 1)
      tipoAluno = 'medio';
  }

  return (
    <>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '70%',
          }}>
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && turmasAnteriores !== undefined && (
        <Tab.Navigator
          key={4}
          tabBarPosition="bottom"
          initialRouteName="Home"
          backBehavior="initialRoute"
          screenOptions={({route}: any) => ({
            swipeEnabled: false,
            tabBarStyle: {
              paddingBottom: 5,
              justifyContent: 'center',
            },
            tabBarLabelStyle: {
              fontSize: 10,
              margin: 0,
              padding: 0,
            },
            tabBarIcon: ({focused, color, size}: any) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Menu') {
                iconName = 'bars';
              } else if (route.name === 'Atividades') {
                iconName = 'tasks';
              } else {
                iconName = 'user';
              }
              return route.name !== 'Atividades' ? (
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? colors.text : 'gray'}
                  style={{textAlign: 'center'}}
                />
              ) : (
                <IconFontAwesome5
                  name={iconName}
                  size={25}
                  color={focused ? colors.text : 'gray'}
                  style={{textAlign: 'center'}}
                />
              );
            },
          })}>
          <Tab.Screen
            name="Menu"
            children={() => (
              <Menu html={html} navigation={navigation} tipoAluno={tipoAluno} />
            )}
          />
          <Tab.Screen
            name="Home"
            children={() => (
              <Disciplinas
                disciplinas={disciplinas}
                navigation={navigation}
                allTurmas={turmasAnteriores}
                tipoAluno={tipoAluno}
                atividades={atividades}
              />
            )}
          />
          <Tab.Screen
            name="Atividades"
            children={() => <Atividades1 atividades={atividades} />}
          />
          <Tab.Screen
            name="Perfil"
            children={() => <Perfil docente={perfilDocente} />}
          />
        </Tab.Navigator>
      )}
    </>
  );
}
