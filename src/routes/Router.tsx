import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Resposta from '../components/Resposta';
import Disciplina from '../screens/Disciplina';
import Avaliacoes from '../screens/Disciplina/MenuDisciplina/Avaliacoes';
import Enquetes from '../screens/Disciplina/MenuDisciplina/Enquetes';
import Foruns from '../screens/Disciplina/MenuDisciplina/Foruns';
import Forum from '../screens/Disciplina/MenuDisciplina/Foruns/Forum';
import Topico from '../screens/Disciplina/MenuDisciplina/Foruns/Topico';
import Frequencia from '../screens/Disciplina/MenuDisciplina/Frequencia';
import Grupo from '../screens/Disciplina/MenuDisciplina/Grupo';
import Notas from '../screens/Disciplina/MenuDisciplina/Nota';
import Participantes from '../screens/Disciplina/MenuDisciplina/Participantes';
import Questionarios from '../screens/Disciplina/MenuDisciplina/Questionarios';
import Tarefas from '../screens/Disciplina/MenuDisciplina/Tarefas';
import HomeScreen from '../screens/Home';
import Login from '../screens/Login';
import Atestado from '../screens/Menu/Atestado';
import ConsultarMatricula from '../screens/Menu/Comprovante';
import ConsultarNotas from '../screens/Menu/ConsultarNotas';
import NotasMedio from '../screens/Menu/NotasMedio';
import Vinculos from '../screens/Vinculos';

const { Navigator, Screen } = createNativeStackNavigator();
export function AppRoutes() {
  const navigation = useNavigation();
  return (
    <Navigator initialRouteName="HomeScreen">
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ navigation }}
      />
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen
        name="Vinculo"
        component={Vinculos}
        options={{ headerShown: false }}
      />
      <Screen name="Comprovante de Matrícula" component={ConsultarMatricula} />
      <Screen name="Consultar Notas" component={ConsultarNotas} />
      <Screen
        name="NotasMedio"
        component={NotasMedio}
        options={{
          title: '',
        }}
      />
      <Screen
        name="Atestado"
        component={Atestado}
        options={{
          title: 'Emitir atestado de matrícula',
        }}
      />
      <Screen
        name="Disciplina"
        component={Disciplina}
        options={{
          title: '',
        }}
      />
      <Screen name="Ver Notas" component={Notas} />
      <Screen name="Participantes" component={Participantes} />
      <Screen name="Frequência" component={Frequencia} />
      <Screen name="Tarefas" component={Tarefas} />
      <Screen name="Resposta" component={Resposta} />
      <Screen name="Ver Grupo" component={Grupo} />
      <Screen name="Fóruns" component={Foruns} />
      <Screen name="Enquetes" component={Enquetes} />
      <Screen name="Avaliações" component={Avaliacoes} />
      <Screen name="Questionários" component={Questionarios} />
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
    </Navigator>
  );
}
