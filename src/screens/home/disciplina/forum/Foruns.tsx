import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {global} from '../../../../global';
import {Loading} from '../../../Loading';

export type PropsForuns = {
  foruns: any;
  navigation: any;
};

const Foruns: React.FC<PropsForuns> = ({foruns, navigation}) => {
  const [loading, setLoading] = useState(false);
  const action = (json: any, titulo: string) => {
    navigation.navigate('Forum', {
      json,
      javaxForum: foruns.javax,
      setLoading,
      navigation,
      titulo,
    });
  };

  return (
    <ScrollView style={[styles.safeArea]}>
      <View style={styles.container}>
        {loading && (
          <View
            style={{
              height: 250,
              marginTop: '50%',
            }}>
            <Loading />
          </View>
        )}
        {!loading &&
          foruns.forunsTurma.map((forum: any) => (
            <TouchableOpacity
              key={forum.titulo}
              style={global.menuItem}
              onPress={() => action(forum.link, forum.titulo)}>
              <View>
                <Text selectable style={global.titulo}>
                  {forum.titulo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Tipo: {forum.tipo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Autor(a): {forum.autor}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Tópicos: {forum.topicos}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Criação: {forum.criacao}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Início: {forum.inicio}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Fim: {forum.fim}
                </Text>
              </View>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 28,
    width: '100%',
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
export default Foruns;
