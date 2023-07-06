import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBackHandler } from '@react-native-community/hooks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAllTurmas } from '../../api/getAllTurmas';
import { getHome } from '../../api/getHome';
import { login } from '../../api/login';
import { Loading } from '../../components/Loading';
import { set, setTipoAluno } from '../../utils/globalUtil';
import Atividades from '../Atividades';
import Disciplinas from '../Diciplinas';
import Menu from '../Menu';
import Perfil from '../Perfil/index';
import {
  AtividadesInterface,
  DisciplinasInterface,
  parseAtividades,
  parseDisciplinas,
} from './util';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen(props: NativeStackScreenProps<any, any>) {
  const route = useRoute();
  const { colors } = useTheme();
  const navigation2: any = useNavigation();
  const controller = new AbortController();
  const [loading, setLoading]: any = useState(true);
  const [html, setHtml]: any = useState<HTMLElement>();
  const { html2, navigation, link, tipo }: any = route.params;
  const [turmasAnteriores, setTurmasAnteriores] = useState<HTMLElement>();
  let disciplinas: DisciplinasInterface[] | undefined;
  let atividades: AtividadesInterface[] | undefined;
  let perfilDocente: any;

  useEffect(() => {
    loga();
  }, []);

  useEffect(() => {
    if (tipo === 1) {
      if (html2) {
        setHtml(html2);
        getAllTurmas(setTurmasAnteriores, setLoading, navigation2);
      }
      if (link) {
        getHome(link, setHtml, setLoading, setTurmasAnteriores, navigation2);
      }
    }
  }, [tipo]);

  const loga = async () => {
    const user = await AsyncStorage.getItem('@sigaa:USER');
    const senha = await AsyncStorage.getItem('@sigaa:SENHA');
    const linkSalvo = await AsyncStorage.getItem('vinculo');

    if (tipo === undefined) {
      if (user && senha) {
        const res = await login(user, senha, {
          navigation: navigation2,
          setLoading,
          setHtml,
          controller,
          tipo: 0,
        });
        setLoading(true);

        if (linkSalvo) {
          getHome(
            linkSalvo,
            setHtml,
            setLoading,
            setTurmasAnteriores,
            navigation2,
          );
        } else if (res?.innerHTML.includes('linkInativo')) {
          navigation2.navigate('Vinculo', {
            tipo: 1,
            htmlVin: res,
          });
        } else {
          getHome(null, setHtml, setLoading, setTurmasAnteriores, navigation2);
        }
      } else {
        navigation2.navigate('Login');
      }
    }
  };

  useBackHandler(handleBackButtonClick);
  function handleBackButtonClick() {
    set();
    controller.abort();
    navigation.navigate('Login');
    return true;
  }

  if (html && !html.innerHTML.includes('linkInativo')) {
    perfilDocente = html?.querySelector('div#perfil-docente');
    disciplinas = parseDisciplinas(html, navigation);
    atividades = parseAtividades(html, navigation);
    if (perfilDocente?.querySelectorAll('table').length <= 1)
      setTipoAluno('medio');
    else setTipoAluno('graduacao');
  }

  return (
    <>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '70%',
          }}
        >
          <Loading />
        </View>
      )}
      {!loading &&
        html !== undefined &&
        turmasAnteriores !== undefined &&
        !html.innerHTML.includes('linkInativo') && (
          <Tab.Navigator
            key={2}
            tabBarPosition="bottom"
            initialRouteName="Home"
            backBehavior="history"
            screenOptions={({ route }: any) => ({
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
              tabBarIcon: ({ focused }: any) => {
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
                    style={{ textAlign: 'center' }}
                  />
                ) : (
                  <IconFontAwesome5
                    name={iconName}
                    size={25}
                    color={focused ? colors.text : 'gray'}
                    style={{ textAlign: 'center' }}
                  />
                );
              },
            })}
          >
            <Tab.Screen
              name="Menu"
              children={() => <Menu html={html} navigation={navigation} />}
            />
            <Tab.Screen
              name="Home"
              children={() => (
                <Disciplinas
                  disciplinas={disciplinas || []}
                  navigation={navigation}
                  allTurmas={turmasAnteriores}
                  atividades={atividades || []}
                />
              )}
            />
            <Tab.Screen
              name="Atividades"
              children={() => <Atividades atividades={atividades || []} />}
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
