import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import { global } from '../global';

const Tarefa: React.FC<any> = ({ tarefas, javax, form, navigation }) => {
  const baixarResolucao = (json: any) => {
    navigation.navigate('Resposta', {
      json,
      form,
      javax,
      navigation,
    });
  };
  let keys = 0;
  return tarefas.map((tarefa: any) => (
    <View style={styles.card} key={tarefa.descricao + keys++}>
      <Text selectable style={global.menuItemText}>
        {tarefa.descricao.split('\n')[0]}
      </Text>
      <Text selectable style={styles.descricao}>
        {tarefa.descricao2}
      </Text>
      <Text selectable style={styles.descricao}>
        Possui nota: {tarefa.nota}
      </Text>
      <Text selectable style={styles.descricao}>
        Período de entrega: {tarefa.periodo}
      </Text>
      {tarefa.baixarArquivo && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => Linking.openURL(tarefa.baixarArquivo)}
        >
          <Text selectable style={styles.conteudo}>
            <IconFont name="download" size={15} color="#0096c7" />
            <Text selectable style={styles.link}>
              Baixar enuciado tarefa.
            </Text>
          </Text>
        </TouchableOpacity>
      )}
      {String(tarefa.json).length > 1 && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => baixarResolucao(tarefa.json)}
        >
          <Text selectable style={styles.conteudo}>
            <IconFont name="eye" size={15} color="#0096c7" solid />
            <Text selectable style={styles.link}>
              Visualizar tarefa enviada.
            </Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ));
};
const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CFDCEF',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
  },
  conteudo: {
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
  link: {
    color: '#0096c7',
    fontSize: 17,
    marginRight: 30,
    justifyContent: 'center',
  },
  descricao: {
    color: '#5B5B5B',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default Tarefa;
