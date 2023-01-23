import { useTheme } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "../../global";
import { DisciplinasInterface } from "../Home/util";
import { getAllturmas } from "./util";
export type PropsDisciplina = {
  disciplinas: any;
  navigation: any;
  allTurmas: any;
  atividades: any;
};

const Disciplinas: React.FC<PropsDisciplina> = ({
  disciplinas,
  navigation,
  allTurmas,
}) => {
  const scrollRef: any = useRef();
  const [visibleAllTurmas, setVisibleAllTurmas] = useState(false);
  const allTurmasParse = getAllturmas(allTurmas.querySelector("div#conteudo"));
  const { colors } = useTheme();

  const turmasAnteriores = () => {
    setVisibleAllTurmas(!visibleAllTurmas);
    scrollRef.current?.scrollTo({ x: 1, y: 1, animated: true });
  };
  const disicplinaAtual = async (disciplina: DisciplinasInterface) => {
    navigation.navigate("Disciplina", {
      disciplina,
      navigation,
      name: disciplina.nome,
      tipo: 1,
    });
  };

  const disicplinaAnteriores = (disciplinas: any) => {
    let name = "";
    const split = disciplinas.disciplina.split("-");
    for (let i = 1; i < split.length; i++) {
      if (i < split.length - 1) name += split[i] + " - ";
      else name += split[i];
    }
    navigation.navigate("Disciplina", {
      disciplina: disciplinas,
      navigation,
      allTurmasParse,
      name: name,
      tipo: 0,
    });
  };

  return (
    <SafeAreaView style={global.container}>
      <ScrollView ref={scrollRef}>
        {!visibleAllTurmas && disciplinas.length > 0 && (
          <Text selectable style={[global.titulo, { color: colors.text }]}>
            Disciplinas no semestre:
          </Text>
        )}
        {!visibleAllTurmas &&
          disciplinas.length > 0 &&
          disciplinas.map((disciplina: DisciplinasInterface) => (
            <TouchableOpacity
              key={disciplina.id}
              style={global.menuItem}
              onPress={() => disicplinaAtual(disciplina)}
            >
              <View>
                <Text selectable style={global.menuItemText}>
                  {disciplina.nome}
                </Text>
                {disciplina.horario.split(",").map((horario: any) => (
                  <Text
                    selectable
                    key={horario.trim()}
                    style={styles.menuItemHorario}
                  >
                    {horario.trim()}
                  </Text>
                ))}
              </View>
              <Text selectable style={global.menuItemIcon}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        {disciplinas.length > 0 && (
          <TouchableOpacity
            style={global.btn}
            onPress={() => turmasAnteriores()}
          >
            <Text selectable style={global.btnText}>
              {visibleAllTurmas
                ? "Ocultar turmas anteriores"
                : "Mostrar turmas anteriores"}
            </Text>
          </TouchableOpacity>
        )}
        {disciplinas.length === 0 && (
          <Text selectable style={[global.titulo, { color: colors.text }]}>
            Matérias dos períodos anteriores:
          </Text>
        )}
        {(visibleAllTurmas || disciplinas.length === 0) &&
          allTurmasParse.map((disciplina: any) => (
            <View key={disciplina.periodo}>
              <Text selectable style={[global.titulo, { color: colors.text }]}>
                {disciplina.periodo}
              </Text>
              {disciplina.turmasPorPeriodo.map((element: any) => (
                <TouchableOpacity
                  key={element.disciplina}
                  style={global.menuItem}
                  onPress={() => disicplinaAnteriores(element)}
                >
                  <View>
                    <Text selectable style={global.menuItemText}>
                      {element.disciplina}
                    </Text>
                  </View>
                  <Text selectable style={global.menuItemIcon}>
                    →
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuItemHorario: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
});
export default Disciplinas;
