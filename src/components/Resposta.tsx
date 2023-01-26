import { useBackHandler } from "@react-native-community/hooks";
import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HTMLElement } from "node-html-parser";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { baixaTarefa } from "../api/tarefas";
import { handleBackButtonClick } from "../utils/globalUtil";
import { Loading } from "./Loading";

const Resposta = (props: NativeStackScreenProps<any, any>) => {
  const controller = new AbortController();

  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { colors } = useTheme();
  const [html, setHTML] = useState<HTMLElement>();
  const { json, form, javax, navigation }: any = route.params;

  useEffect(() => {
    baixaTarefa(json, form, javax, setLoading, navigation, setHTML, controller);
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  let fieldsets: any = [];
  if (html) {
    fieldsets = html.querySelectorAll("fieldset");
  }
  return (
    <ScrollView style={[styles.safeArea]}>
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
        <>
          <Text style={[styles.titulo, { color: colors.text }]}>
            {fieldsets.length > 0 &&
              fieldsets[0].querySelector("legend").textContent.trim()}
          </Text>
          <Text style={[styles.conteudo, { color: colors.text }]}>
            Resposta:
          </Text>
          <Text selectable style={[styles.conteudo, { color: colors.text }]}>
            {fieldsets[0]
              .querySelector("ul.form")
              .textContent.trim()
              .replace(/\t/g, "")
              .replace("Resposta:", "")}
          </Text>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: colors.text,
              borderBottomWidth: 2,
            }}
          />
          {fieldsets.length > 0 && (
            <>
              <Text style={[styles.titulo, { color: colors.text }]}>
                {fieldsets[1]?.querySelector("legend").textContent.trim()}
              </Text>
              <Text
                selectable
                style={[styles.conteudo, { color: colors.text }]}
              >
                {fieldsets[1]
                  ?.querySelector("ul.form")
                  .textContent.trim()
                  .replace(/\t/g, "")}
              </Text>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 3,
    marginBottom: 3,
  },
});
export default Resposta;
