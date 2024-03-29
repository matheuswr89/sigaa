import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { global } from '../../../global';

export type PropsMenuDisciplina = {
  menuDisic: any;
  navigation: any;
  tipoAluno: string;
  setLoading?: any;
};

const MenuDisciplina: React.FC<PropsMenuDisciplina> = ({
  menuDisic,
  navigation,
  tipoAluno,
  setLoading,
}) => {
  const redirectScreen = (json: any) => {
    navigation.navigate(json.name, {
      menu: json,
      setLoading,
      navigation,
      tipoAluno,
      nameScreen: json.name,
    });
  };
  return (
    <SafeAreaView style={[global.container2, { marginTop: 10 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuDisic.map((json: any) => (
          <TouchableOpacity
            key={json.id}
            style={global.menuItem}
            onPress={() => redirectScreen(json)}
          >
            <Text selectable style={global.menuItemText}>
              {json.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuDisciplina;
