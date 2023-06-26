import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModalAtividades from "./ModalAtividade";

export type PropsAtividades = {
  atividades: any;
  msg: string;
  cor?: string;
  tipo?: number | undefined;
  link: any;
};

const Atividade: React.FC<PropsAtividades> = ({
  atividades,
  msg,
  cor,
  tipo,
  link,
}) => {
  const AVISO_ATIVIDADE =
    "ATENÇÃO: É somente para consulta, não dá para enviar a resolução da atividade, mas é possível baixar o arquivo que o professor mandou!";
  const [modalVisible, setModalVisibleativi] = useState(true);
  const [atividade, setAtividade] = useState(null);
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container]}>
      {atividades.length === 0 && (
        <Text selectable style={[styles.titulo, { color: colors.text }]}>
          {msg}
        </Text>
      )}
      {atividades.length > 0 && (tipo === undefined || tipo === 1) && (
        <Text selectable style={styles.aviso}>
          {AVISO_ATIVIDADE}
        </Text>
      )}
      {atividades.map((ativid: any) => (
        <ViewAtividade
          ativid={ativid}
          cor={cor}
          key={ativid.descricao}
          setModalVisibleativi={setModalVisibleativi}
          setAtividade={setAtividade}
          modalVisible={modalVisible}
          tipo={tipo}
        />
      ))}
      <View style={styles.view} />
      {!modalVisible && (
        <ModalAtividades
          modalVisible={modalVisible}
          open={setModalVisibleativi}
          att={atividade}
          tipo={0}
          link={link}
        />
      )}
    </ScrollView>
  );
};
const ViewAtividade: React.FC<any> = ({
  ativid,
  cor,
  tipo,
  setAtividade,
  setModalVisibleativi,
}) => {
  const openModal = (ativid: any) => {
    setModalVisibleativi(false);
    setAtividade(ativid);
  };

  if (ativid.descricao.includes("Tarefa:") && tipo === 1) {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: cor }]}
        onPress={() => openModal(ativid)}
      >
        <Content ativid={ativid} />
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.card, { backgroundColor: cor }]}>
        <Content ativid={ativid} />
      </View>
    );
  }
};

const Content: React.FC<any> = ({ ativid }) => {
  return (
    <>
      <Text selectable style={styles.menuItemText}>
        Data Entrega: {ativid.data}
      </Text>
      <Text selectable style={styles.menuItemText}>
        {ativid.descricao.split("\n")[0]}
      </Text>
      <Text selectable style={styles.menuItemText}>
        {ativid.descricao.split("\n")[1]} {ativid.descricao.split("\n")[2]}
      </Text>
    </>
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
    fontWeight: "bold",

    paddingTop: 10,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  aviso: {
    flex: 1,
    color: "#E56201",
    width: "95%",
    paddingBottom: 10,
  },
});

export default Atividade;
