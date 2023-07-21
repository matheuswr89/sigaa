import AsyncStorage from '@react-native-async-storage/async-storage';
import { HTMLElement } from 'node-html-parser';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalDownload from '../../components/ModalDownload';
import { global } from '../../global';

export type PropsMenu = {
  html: HTMLElement;
  navigation: any;
};

const Menu: React.FC<PropsMenu> = ({ html, navigation }) => {
  const [tipoAluno, setTipoAluno]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('tipoAluno');
    setTipoAluno(data || '');
  });
  const [payload, setPayload] = useState({});
  const [modalVisible, setModalVisible] = useState(true);
  const wrapper: HTMLElement | null | undefined = html?.querySelector(
    'div#menu-dropdown > div.wrapper',
  );
  const menu = [
    {
      id: 12938,
      name: 'Consultar notas',
      action: () =>
        navigation.navigate('Consultar Notas', {
          wrapper,
          navigation,
          tipoAluno,
        }),
    },
    {
      id: 12939,
      name: 'Emitir atestado de matrícula',
      action: () =>
        navigation.navigate('Atestado', {
          wrapper,
          navigation,
          tipoAluno,
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
        navigation.navigate('Comprovante de Matrícula', {
          wrapper,
          navigation,
        }),
    },
  ];
  if (
    tipoAluno === 'medio' &&
    menu[menu.length - 1].name.includes('Ver comprovante de matrícula')
  ) {
    menu.pop();
  }

  const baixar = async (tipo: string) => {
    let action = wrapper?.querySelector('div')?.id || '';

    if (tipo === 'historico') {
      action += ':A]#{portalDiscente.historico}';
    } else if (tipo === 'declaracao') {
      action += ':A]#{declaracaoVinculo.emitirDeclaracao}';
    } else if (tipo === 'carteirinha') {
      action += ':A]#{carteiraEstudanteMBean.imprimeCarteirinhaIndividual}';
    }

    const id =
      wrapper?.querySelector("input[name='id']")?.attributes.value || '';
    const viewState =
      wrapper?.querySelector("input[name='javax.faces.ViewState']")?.attributes
        .value || '';

    const payloadMenu = {
      'menu:form_menu_discente': 'menu:form_menu_discente',
      id,
      jscook_action: action,
      'javax.faces.ViewState': viewState,
    };
    setPayload(payloadMenu);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={global.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {menu.map(({ id, name, action }: any) => (
            <TouchableOpacity
              key={id}
              style={global.menuItem}
              onPress={() => action({ id, name })}
            >
              <Text selectable style={global.menuItemText}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {!modalVisible && (
          <ModalDownload
            modalVisible={modalVisible}
            open={setModalVisible}
            payload={payload}
            tipo="menu"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
