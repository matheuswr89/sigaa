import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { global } from '../global';
import checkConnection from '../hooks/connection';

const Login = (props: NativeStackScreenProps<any, any>) => {
  const { colors } = useTheme();
  const { navigation } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('@sigaa:USER');
    setUser(data || '');
  });
  const [senha, setSenha]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('@sigaa:SENHA');
    setSenha(data || '');
  });
  const logar = async () => {
    Keyboard.dismiss();
    await AsyncStorage.setItem('back', 'false');
    navigation.navigate('Vinculo', { navigation, user, senha, tipo: 3 });
  };
  checkConnection();

  return (
    <SafeAreaView style={global.container}>
      <View>
        <Image
          progressiveRenderingEnabled={true}
          style={styles.image}
          source={require('../../assets/SIGAALOGIN.png')}
        />
        <Text style={[global.titulo, { color: colors.text }]}>Entrar</Text>
        <TextInput
          value={user.toString()}
          onChangeText={setUser}
          placeholder="Usuário"
          style={[global.input]}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          secureTextEntry={false}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor="#000"
        />
        <View style={global.passwordContainer}>
          <TextInput
            value={senha.toString()}
            onChangeText={setSenha}
            placeholder="Senha"
            autoComplete="off"
            autoCapitalize="none"
            style={[global.input]}
            secureTextEntry={!showPassword}
            onSubmitEditing={Keyboard.dismiss}
            placeholderTextColor="#000"
          />
          <IconMaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
            style={global.searchIcon}
          />
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Login"
          onPress={logar}
        >
          <View style={global.btn}>
            <Text style={global.btnText}>Entrar</Text>
          </View>
        </TouchableOpacity>
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
