import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {global} from '../../../global';

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
    //menuDisciplinaAction(json, setLoading, navigation, tipoAluno);
    navigation.navigate('MenuDisciplinaScreen', {
      menu: json,
      setLoading,
      navigation,
      tipoAluno,
      nameScreen: json.name,
    });
  };
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <View>
          {menuDisic.map((json: any) => (
            <TouchableOpacity
              key={json.id}
              style={global.menuItem}
              onPress={() => redirectScreen(json)}>
              <Text selectable style={global.menuItemText}>
                {json.name}
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
    padding: 16,
  },
});

export default MenuDisciplina;
