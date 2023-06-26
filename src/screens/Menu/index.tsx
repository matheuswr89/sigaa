import AsyncStorage from "@react-native-async-storage/async-storage";
import { HTMLElement } from "node-html-parser";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { downloadMenu } from "../../api/downloadMenu";
import { global } from "../../global";

export type PropsMenu = {
  html: HTMLElement;
  navigation: any;
  link: any;
};

const Menu: React.FC<PropsMenu> = ({ html, navigation, link }) => {
  const controller = new AbortController();
  const [tipoAluno, setTipoAluno]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem("tipoAluno");
    setTipoAluno(data || "");
  });
  const wrapper: HTMLElement | null | undefined = html?.querySelector(
    "div#menu-dropdown > div.wrapper"
  );
  const menu = [
    {
      id: 12938,
      name: "Consultar notas",
      action: () =>
        navigation.navigate("Consultar Notas", {
          wrapper,
          navigation,
          tipoAluno,
          link,
        }),
    },
    {
      id: 12939,
      name: "Emitir atestado de matrícula",
      action: () =>
        navigation.navigate("Atestado", {
          wrapper,
          navigation,
          tipoAluno,
          link,
        }),
    },
    {
      id: 12941,
      name: "Emitir Histórico",
      action: () => baixar("historico"),
    },
    {
      id: 12942,
      name: "Emitir Declaração de Vínculo",
      action: () => baixar("declaracao"),
    },
    {
      id: 12943,
      name: "Emitir Carteirinha de Estudante",
      action: () => baixar("carteirinha"),
    },
    {
      id: 12940,
      name: "Ver comprovante de matrícula",
      action: () =>
        navigation.navigate("Comprovante de Matrícula", {
          wrapper,
          navigation,
          link,
        }),
    },
  ];
  if (
    tipoAluno === "medio" &&
    menu[menu.length - 1].name.includes("Ver comprovante de matrícula")
  )
    menu.pop();

  const baixar = (tipo: string) => {
    let action = wrapper?.querySelector("div")?.id;
    if (tipo === "historico") action += ":A]#{portalDiscente.historico}";
    if (tipo === "declaracao")
      action += ":A]#{declaracaoVinculo.emitirDeclaracao}";
    if (tipo === "carteirinha")
      action += ":A]#{carteiraEstudanteMBean.imprimeCarteirinhaIndividual}";
    const payload = {
      "menu:form_menu_discente": "menu:form_menu_discente",
      id: wrapper?.querySelector("input[name='id']")?.attributes.value,
      jscook_action: action,
      "javax.faces.ViewState": wrapper?.querySelector(
        "input[name='javax.faces.ViewState']"
      )?.attributes.value,
    };
    downloadMenu(payload, controller, link);
  };

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        <View>
          {menu.map(({ id, name, action }: any) => (
            <TouchableOpacity
              key={id}
              style={global.menuItem}
              onPress={() => action({ id, name })}
            >
              <Text selectable style={global.menuItemText}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
