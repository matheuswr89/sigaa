import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {global} from '../global';

const Login = (props: NativeStackScreenProps<any, any>) => {
  const {colors} = useTheme();
  const {navigation} = props;
  const [visivel, setVisivel] = useState<boolean>(true);
  const [user, setUser]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('user');
    setUser(data || '');
  });
  const [senha, setSenha]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('senha');
    setSenha(data || '');
  });

  const logar = async () => {
    await AsyncStorage.setItem('back', 'false');
    navigation.navigate('HomeScreen', {navigation, user, senha});
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={[global.container]}>
        <Image
          progressiveRenderingEnabled={true}
          style={styles.image}
          source={require('../../assets/SIGAALOGIN.png')}
        />
        <Text style={[global.title, {color: colors.text}]}>Entrar</Text>
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
              <TextInput.Icon name="eye" onPress={() => setVisivel(!visivel)} />
            }
            secureTextEntry={visivel}
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
    width: '100%',
    marginTop: 10,
    backgroundColor: '#E3E5EA',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  inputField: {
    marginBottom: 15,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
  },
});

export default Login;
