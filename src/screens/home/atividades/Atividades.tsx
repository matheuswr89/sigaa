import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useRoute, useTheme} from '@react-navigation/native';
import Atividade from './Atividade';

const TabAtividades = createMaterialTopTabNavigator();

export type PropsAtividades = {
  atividades: any;
};

const Atividades: React.FC<PropsAtividades> = ({atividades}) => {
  const route = useRoute();
  const {colors} = useTheme();

  let atividadesSemana: any = [],
    atividadesMes: any = [],
    atividadesEnviadas: any = [],
    atividadesAntigas: any = [];

  for (let i = 0; i < atividades.length; i++) {
    if (atividades[i].status === null && atividades[i].dias === null) {
      atividadesAntigas.push(atividades[i]);
    } else if (atividades[i].status === 'prova_mes' && atividades[i].dias > 7) {
      atividadesMes.push(atividades[i]);
    } else if (
      atividades[i].status === 'prova_semana' &&
      atividades[i].dias <= 7
    ) {
      atividadesSemana.push(atividades[i]);
    } else {
      atividadesEnviadas.push(atividades[i]);
    }
  }

  return (
    <TabAtividades.Navigator
      initialRouteName="Na Semana"
      backBehavior="none"
      screenOptions={({route}: any) => ({
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 10,
          height: 56,
        },
      })}>
      <TabAtividades.Screen
        name="Antigas"
        children={() => (
          <Atividade
            atividades={atividadesAntigas}
            msg={'Sem atividades antigas!'}
            cor={'#C0C0C0'}
            tipo={0}
          />
        )}
      />
      <TabAtividades.Screen
        name="Na Semana"
        children={() => (
          <Atividade
            atividades={atividadesSemana}
            msg={'Sem atividades na semana!'}
            cor={'#FDF54C'}
            tipo={1}
          />
        )}
      />
      <TabAtividades.Screen
        name="Próximas"
        children={() => (
          <Atividade
            atividades={atividadesMes}
            msg={'Sem atividades no mês!'}
            cor={'#87cefa'}
            tipo={1}
          />
        )}
      />
      <TabAtividades.Screen
        name="Enviadas"
        children={() => (
          <Atividade
            atividades={atividadesEnviadas}
            msg={'Sem atividades enviadas!'}
            cor={'#7EF78F'}
            tipo={1}
          />
        )}
      />
    </TabAtividades.Navigator>
  );
};

export default Atividades;
