import { Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "../../../global";

export type PropsMenuDisciplina = {
  menuDisic: any;
  navigation: any;
  tipoAluno: string;
  id: any;
  tipo: 0 | 1;
  link: any;
  setLoading?: any;
};

const MenuDisciplina: React.FC<PropsMenuDisciplina> = ({
  menuDisic,
  navigation,
  tipoAluno,
  id,
  tipo,
  link,
  setLoading,
}) => {
  const redirectScreen = (json: any) => {
    navigation.navigate(json.name, {
      menu: json,
      setLoading,
      navigation,
      tipoAluno,
      nameScreen: json.name,
      id,
      tipo,
      link,
    });
  };
  return (
    <SafeAreaView style={global.container}>
      <ScrollView style={{ marginTop: -10 }}>
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
