import { useBackHandler } from "@react-native-community/hooks";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getDisciplina } from "../../api/disciplinas";
import { getDisciplinaAnteriores } from "../../api/disciplinasAnteriores";
import { Loading } from "../../components/Loading";
import { handleBackButtonClick } from "../../utils/globalUtil";
import HomeDisciplina from "./HomeDisciplina";
import MenuDisciplina from "./MenuDisciplina";
import { menuDisicplina, menuDisicplinaDrop } from "./util";

const TabDisciplina = createMaterialTopTabNavigator();

export default function Disciplina(props: NativeStackScreenProps<any, any>) {
  const controller = new AbortController();
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<HTMLElement>();
  const { colors } = useTheme();
  const route = useRoute();
  const { navigation, tipoAluno, tipo, allTurmasParse, disciplina, link }: any =
    route.params;
  useEffect(() => {
    props.navigation.setOptions({ title: props.route.params?.name });
    if (tipo === 1)
      getDisciplina(
        disciplina,
        navigation,
        tipoAluno,
        setLoading,
        setHtml,
        controller,
        link
      );
    else
      getDisciplinaAnteriores(
        disciplina,
        navigation,
        tipoAluno,
        allTurmasParse,
        setLoading,
        setHtml,
        controller,
        link
      );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  const areaDisciplina = html;
  let menuCode;
  let javax;
  let menuCode1;
  let javaxMenuDrop;
  let menuDisc: any;
  if (html) {
    menuCode = html.querySelectorAll("div#barraEsquerda > div > div");
    javax = html.querySelector(
      "form#formMenu > input[name='javax.faces.ViewState']"
    )?.attributes.value;
    menuCode1 = html.querySelectorAll("div#barraEsquerda > div")[0]?.id;

    javaxMenuDrop = html.querySelector(
      "form#formMenuDrop > input[name='javax.faces.ViewState']"
    )?.attributes.value;
    menuDisc = javaxMenuDrop
      ? menuDisicplinaDrop({ javaxMenuDrop })
      : menuDisicplina({ menuCode, javax, menuCode1, tipoAluno });
  }
  return (
    <>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: "60%",
          }}
        >
          <Loading />
        </View>
      )}
      {!loading && html && (
        <TabDisciplina.Navigator
          key={3}
          backBehavior="none"
          tabBarPosition="bottom"
          initialRouteName="Home Disciplina"
          screenOptions={({ route }: any) => ({
            tabBarStyle: {
              paddingBottom: 5,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              margin: 0,
              padding: 0,
              width: 1000,
            },
            tabBarIcon: ({ focused, color, size }: any) => {
              let iconName = "";

              if (route.name === "Home Disciplina") {
                iconName = "book";
              } else if (route.name === "Menu Disciplina") {
                iconName = "bars";
              }
              return (
                <Icon
                  name={iconName}
                  size={25}
                  color={focused ? colors.text : "gray"}
                  style={{ textAlign: "center" }}
                />
              );
            },
          })}
        >
          <TabDisciplina.Screen
            name="Menu Disciplina"
            children={() => (
              <MenuDisciplina
                menuDisic={menuDisc}
                tipoAluno={tipoAluno}
                navigation={navigation}
                id={disciplina.id || disciplina.json.idTurma}
                tipo={tipo}
                link={link}
              />
            )}
          />
          <TabDisciplina.Screen
            name="Home Disciplina"
            children={() => (
              <HomeDisciplina
                html={areaDisciplina}
                navigation={navigation}
                setLoading={setLoading}
                id={disciplina.id || disciplina.json.idTurma}
                tipo={tipo}
                link={link}
              />
            )}
          />
        </TabDisciplina.Navigator>
      )}
    </>
  );
}
