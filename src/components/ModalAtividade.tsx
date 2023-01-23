import { useTheme } from "@react-navigation/native";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { fetchData } from "../api/modal";
import { Loading } from "./Loading";

export type PropsModal = {
  modalVisible: boolean;
  open: any;
  att: any;
  tipo: number;
  javax?: string;
};

const ModalAtividades: React.FC<PropsModal> = ({
  modalVisible,
  open,
  att,
  tipo,
  javax,
}) => {
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<HTMLElement[]>([]);
  const [link, setLink] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    fetchData(att, setLoading, setContent, setLink, tipo, javax, controller);
  }, []);
  const fun = () => {
    controller.abort();
    open(!modalVisible);
  };
  return (
    att && (
      <View style={[styles.centeredView]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!modalVisible}
          onRequestClose={() => fun()}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.text }]}
              onPress={() => fun()}
            >
              <IconMaterialIcons name="close" color={colors.background} />
            </TouchableOpacity>
            <View style={[styles.modalView, { backgroundColor: colors.card }]}>
              {loading && <Loading />}
              {!loading && content.length > 1 && (
                <ScrollView>
                  <View>
                    <Text selectable>
                      <Text
                        selectable
                        style={[styles.textBold, { color: colors.text }]}
                      >
                        {content[0]?.textContent
                          .split(":")[0]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                        :
                      </Text>
                      <Text
                        selectable
                        style={[styles.text, { color: colors.text }]}
                      >
                        {content[0]?.textContent
                          .split(":")[1]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                      </Text>
                    </Text>
                    <Text selectable>
                      <Text
                        selectable
                        style={[styles.textBold, { color: colors.text }]}
                      >
                        {content[1]?.textContent
                          .split(":")[0]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                        :
                      </Text>
                      <Text
                        selectable
                        style={[styles.text, { color: colors.text }]}
                      >
                        {content[1]?.textContent
                          .split(":")[1]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                      </Text>
                    </Text>
                    <Text selectable>
                      <Text
                        selectable
                        style={[styles.textBold, { color: colors.text }]}
                      >
                        {content[3]?.textContent
                          .split(":")[0]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                        :
                      </Text>
                      <Text
                        selectable
                        style={[styles.text, { color: colors.text }]}
                      >
                        {content[3]?.textContent
                          .split(":")[1]
                          .replace(/\r/g, "")
                          .replace(/\t/g, "")
                          .replace(/\n/g, "")}
                      </Text>
                    </Text>
                    {!link.includes("undefined") && (
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => Linking.openURL(link)}
                      >
                        <Text selectable style={[styles.btnText]}>
                          Baixar arquivo enviado pelo professor
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              )}
              {!loading && content.length == 1 && (
                <Text selectable style={[styles.aviso, { color: colors.text }]}>
                  {content[0]?.textContent
                    .replace(/\r/g, "")
                    .replace(/\t/g, "")
                    .replace(/\n/g, "")}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "30%",
    zIndex: 90,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: "36%",
    top: "8%",
    zIndex: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    fontSize: 20,
  },
  text: {},
  textBold: {
    fontWeight: "bold",
  },
  btn: {
    marginTop: 5,
    backgroundColor: "#4683DF",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  aviso: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ModalAtividades;
