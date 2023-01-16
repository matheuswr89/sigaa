import {HTMLElement} from 'node-html-parser';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {downloadMenu} from '../../api/downloadMenu';
import {global} from '../../global';

export type PropsMenu = {
  html: HTMLElement;
  navigation: any;
  tipoAluno: string;
};

const Menu: React.FC<PropsMenu> = ({html, navigation, tipoAluno}) => {
  const controller = new AbortController();

  const wrapper: HTMLElement | null | undefined = html?.querySelector(
    'div#menu-dropdown > div.wrapper',
  );
  const menu = [
    {
      id: 12938,
      name: 'Consultar notas',
      action: () =>
        navigation.navigate('ConsultarNotas', {wrapper, navigation, tipoAluno}),
    },
    {
      id: 12939,
      name: 'Emitir atestado de matrícula',
      action: () =>
        navigation.navigate('MenuDisciplinaScreen', {
          wrapper,
          navigation,
          tipoAluno,
          tipo: 'menuHome',
          nameScreen: 'Emitir atestado de matrícula',
        }),
    },
    {
      id: 12941,
      name: 'Emitir Histórico',
      action: () => baixar('historico'),
    },
    {
      id: 12942,
      name: 'Emitir Declaração de Vínculo',
      action: () => baixar('declaracao'),
    },
    {
      id: 12943,
      name: 'Emitir Carteirinha de Estudante',
      action: () => baixar('carteirinha'),
    },
    {
      id: 12940,
      name: 'Ver comprovante de matrícula',
      action: () =>
        navigation.navigate('ConsultarMatricula', {wrapper, navigation}),
    },
  ];
  if (
    tipoAluno === 'medio' &&
    menu[menu.length - 1].name.includes('Ver comprovante de matrícula')
  )
    menu.pop();

  const baixar = (tipo: string) => {
    let action = wrapper?.querySelector('div')?.id;
    if (tipo === 'historico') action += ':A]#{portalDiscente.historico}';
    if (tipo === 'declaracao')
      action += ':A]#{declaracaoVinculo.emitirDeclaracao}';
    if (tipo === 'carteirinha')
      action += ':A]#{carteiraEstudanteMBean.imprimeCarteirinhaIndividual}';
    const payload = {
      'menu:form_menu_discente': 'menu:form_menu_discente',
      id: wrapper?.querySelector("input[name='id']")?.attributes.value,
      jscook_action: action,
      'javax.faces.ViewState': wrapper?.querySelector(
        "input[name='javax.faces.ViewState']",
      )?.attributes.value,
    };
    downloadMenu(payload, controller);
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <View style={styles.container}>
          {menu.map(({id, name, action}: any) => (
            <TouchableOpacity
              key={id}
              style={global.menuItem}
              onPress={() => action({id, name})}>
              <Text selectable style={global.menuItemText}>
                {name}
              </Text>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 28,
  },
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Menu;
