import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Disciplina from '../home/disciplina/Disciplina';
import Forum from '../home/disciplina/forum/Forum';
import Topico from '../home/disciplina/forum/Topico';
import Resposta from '../home/disciplina/Resposta';
import HomeScreen from '../home/HomeScreen';
import ConsultarMatricula from '../home/menu/ComprovanteMatricula';
import ConsultarNotas from '../home/menu/ConsultarNotas';
import NotasMedio from '../home/menu/NotasMedio';
import Login from '../Login';
import MenuDisciplinaScreen from '../ScreenMenuDisciplina';

const {Navigator, Screen} = createNativeStackNavigator();
export function AppRoutes() {
  const navigation = useNavigation();

  const [user, setUser]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('user');
    setUser(data || '');
  });
  const [senha, setSenha]: any = useState(async () => {
    const data: string | null = await AsyncStorage.getItem('senha');
    setSenha(data || '');
  });

  return (
    <Navigator>
      <Screen name="Login" component={Login} options={{headerShown: false}} />
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
        initialParams={{user, senha, navigation}}
      />
      <Screen
        name="NotasMedio"
        component={NotasMedio}
        options={{
          title: '',
        }}
      />
      <Screen
        name="ConsultarMatricula"
        component={ConsultarMatricula}
        options={{
          title: 'Comprovante de Matrícula',
        }}
      />
      <Screen
        name="ConsultarNotas"
        component={ConsultarNotas}
        options={{
          title: 'Consultar Notas',
        }}
      />
      <Screen
        name="MenuDisciplinaScreen"
        component={MenuDisciplinaScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name="Disciplina1"
        component={Disciplina}
        options={{
          title: '',
        }}
      />
      <Screen
        name="Forum"
        component={Forum}
        options={{
          title: '',
        }}
      />
      <Screen
        name="Topico"
        component={Topico}
        options={{
          title: '',
        }}
      />
      <Screen name="Resposta" component={Resposta} />
    </Navigator>
  );
}
