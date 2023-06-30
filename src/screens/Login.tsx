import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput } from "react-native-paper";

import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { global } from "../global";
import checkConnection from "../hooks/connection";

const Login = (props: NativeStackScreenProps<any, any>) => {
  const { colors } = useTheme();
  const { navigation } = props;
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [user, setUser]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem("@sigaa:USER");
    setUser(data || "");
  });
  const [senha, setSenha]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem("@sigaa:SENHA");
    setSenha(data || "");
  });
  const logar = async () => {
    await AsyncStorage.setItem("back", "false");
    navigation.navigate("Vinculo", { navigation, user, senha });
  };
  checkConnection();

  return (
    <SafeAreaView style={global.container}>
      <View>
        <Image
          progressiveRenderingEnabled={true}
          style={styles.image}
          source={require("../../assets/SIGAALOGIN.png")}
        />
        <Text style={[global.titulo, { color: colors.text }]}>Entrar</Text>
        <TextInput
          label="Usuário"
          style={styles.input}
          onChangeText={(newText: string) => setUser(newText)}
          defaultValue={user}
        />
        <View style={styles.inputField}>
          <TextInput
            label="Senha"
            style={styles.input}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            secureTextEntry={showPassword}
            onChangeText={(newText: string) => setSenha(newText)}
            defaultValue={senha}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => logar()}>
          <View style={global.btn}>
            <Text style={global.btnText}>Entrar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#E3E5EA",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  inputField: {
    marginBottom: 15,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "contain",
  },
});

export default Login;
