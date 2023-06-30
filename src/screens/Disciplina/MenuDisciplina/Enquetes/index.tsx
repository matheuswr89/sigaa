import { useBackHandler } from "@react-native-community/hooks";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuDisciplinaAction } from "../../../../api/menuDisciplina";
import { Loading } from "../../../../components/Loading";
import ModalEnquete from "../../../../components/ModalEnquetes";
import { global } from "../../../../global";
import { handleBackButtonClick } from "../../../../utils/globalUtil";
import { parseEnquetes } from "./util";

const Enquetes = (props: NativeStackScreenProps<any, any>) => {
  const { navigation }: any = props;
  const route = useRoute();
  const { menu }: any = route.params;
  const controller = new AbortController();
  const [enquete, setEnquete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<HTMLElement>();
  const [modalVisible, setModalVisibleativi] = useState(true);

  let enquetes: any;

  useEffect(() => {
    menuDisciplinaAction(menu, setLoading, navigation, setHtml, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  if (html) {
    enquetes = parseEnquetes(html.querySelector("table.listing"));
  }
  function action(json: any) {
    const form = html?.querySelector(
      'form[action="/sigaa/ava/Enquete/listar.jsf"]'
    );
    let jsonDefinitive = {
      ...json,
      "javax.faces.ViewState": form?.querySelector(
        'input[name="javax.faces.ViewState"]'
      )?.attributes.value,
    };
    jsonDefinitive[`${form?.attributes.id}`] = form?.attributes.id;
    setModalVisibleativi(false);
    setEnquete(jsonDefinitive);
  }

  return (
    <SafeAreaView style={global.container2}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: "-40%",
          }}
        >
          <Loading />
        </View>
      )}
      {!loading && html !== undefined && (
        <ScrollView style={{ marginTop: -35 }}>
          {enquetes.enquetes.map((enquete: any) => (
            <TouchableOpacity
              key={enquete.titulo + enquete.created_at}
              style={global.menuItem}
              onPress={() => action(enquete.json)}
            >
              <View>
                <Text selectable style={global.tituloCard}>
                  {enquete.pergunta}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Criado em: {enquete.created_at}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Prazo para Votação: {enquete.prazo}
                </Text>
                <Text selectable style={global.menuItemText}>
                  Status: {enquete.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {!modalVisible && (
        <ModalEnquete
          modalVisible={modalVisible}
          open={setModalVisibleativi}
          enquete={enquete}
          tipo={0}
        />
      )}
    </SafeAreaView>
  );
};

export default Enquetes;
