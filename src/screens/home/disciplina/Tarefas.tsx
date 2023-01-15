import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome5';

export type PropsTarefas = {
  tarefas: any;
  navigation: any;
};

const Tarefas: React.FC<PropsTarefas> = ({tarefas, navigation}) => {
  return (
    <View style={{height: '100%'}}>
      {tarefas.vazio && (
        <Text selectable style={styles.aviso}>
          {tarefas.vazio}
        </Text>
      )}
      <Tarefa
        vazio={tarefas.vazio}
        tarefas={tarefas.individual}
        javax={tarefas['javax.faces.ViewState']}
        form={tarefas.form}
        navigation={navigation}
      />
      <Tarefa
        vazio={tarefas.vazio}
        tarefas={tarefas.grupo}
        javax={tarefas['javax.faces.ViewState']}
        form={tarefas.form}
        navigation={navigation}
      />
    </View>
  );
};

const Tarefa: React.FC<any> = ({vazio, tarefas, javax, form, navigation}) => {
  const baixarResolucao = (json: any) => {
    //baixaTarefa(json, form, javax, navigation);
    navigation.navigate('Resposta', {
      json,
      form,
      javax,
      navigation,
    });
  };
  let keys = 0;
  return (
    <ScrollView style={styles.container}>
      {tarefas.map((tarefa: any) => (
        <View style={styles.card} key={tarefa.descricao + keys++}>
          <Text selectable style={styles.menuItemText}>
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
              onPress={() => Linking.openURL(tarefa.baixarArquivo)}>
              <Text selectable style={styles.conteudo}>
                <IconFont name="download" size={15} color="#0096c7" />
                <Text selectable style={styles.link}>
                  Baixar enuciado tarefa.
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {String(tarefa.json).length > 1 && (
            <TouchableOpacity onPress={() => baixarResolucao(tarefa.json)}>
              <Text selectable style={styles.conteudo}>
                <IconFont name="eye" size={15} color="#0096c7" solid />
                <Text selectable style={styles.link}>
                  Visualizar tarefa enviada.
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  view: {
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CFDCEF',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  aviso: {
    flex: 1,
    fontSize: 20,
    color: '#E56201',
    width: '95%',
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
    textContent: 'center',
  },
  descricao: {
    color: '#5B5B5B',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tarefas;
