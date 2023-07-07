import { useNavigation, useTheme } from '@react-navigation/native';
import Constants from 'expo-constants';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { global } from '../../global';
import { useTheme as personalTheme } from '../../hooks/useTheme';
import { replaceAll } from '../../utils/globalUtil';
import { parseAcademico, parseIntegral } from './util';

export type PropsPerfil = {
  docente: HTMLElement;
};

const Perfil: React.FC<PropsPerfil> = ({ docente }) => {
  const navigation: any = useNavigation();
  let arrayAcademico: any[] = [];
  let arrayIntegral: any[] = [];
  let teste;
  let valor;
  const [mode, setMode] = useState(true);

  const { getTheme, saveTheme } = personalTheme();

  const { colors } = useTheme();

  useEffect(() => {
    changeTheme();
  }, []);

  async function changeTheme() {
    const theme = await getTheme();
    if (theme !== undefined) {
      setMode(!theme);
    }
  }

  if (docente.querySelectorAll('table')[1]) {
    arrayAcademico = parseAcademico(
      docente.querySelectorAll('table')[1].querySelectorAll('tr'),
    );
    arrayIntegral = parseIntegral(
      docente.querySelectorAll('table')[2].querySelectorAll('tr'),
    );

    teste = arrayIntegral[arrayIntegral.length - 1].name;
    valor = teste.split('%')[0] + '%';
    arrayIntegral.pop();
    arrayIntegral.pop();
  }

  const acaoSair = async () => {
    navigation.replace('Login');
  };

  const mudarVinculo = () => {
    navigation.navigate('Vinculo', { tipo: 2, navigation });
  };

  return (
    <SafeAreaView style={[global.container2, styles.safeArea]}>
      <ScrollView>
        <View>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            {docente.querySelector('p.info-docente > span')?.textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            Matricula: {docente.querySelectorAll('td')[1].textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            Curso: {replaceAll(docente.querySelectorAll('td')[3].textContent)}
          </Text>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            Status: {docente.querySelectorAll('td')[7].textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            Nível: {docente.querySelectorAll('td')[5].textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, { color: colors.text }]}>
            Entrada: {docente.querySelectorAll('td')[11].textContent.trim()}
          </Text>
          <View style={{ padding: 10 }} />
          {arrayAcademico.map(ads => (
            <Text selectable key={ads.indice}>
              <Text selectable style={[styles.cargas, { color: colors.text }]}>
                {ads.indice}:{' '}
              </Text>
              <Text selectable style={[styles.cargas, { color: colors.text }]}>
                {ads.valor}
              </Text>
            </Text>
          ))}
          <View style={{ padding: 10 }} />
          {arrayIntegral.map(ads => (
            <Text selectable key={ads.name}>
              <Text selectable style={[styles.cargas, { color: colors.text }]}>
                {ads.name}:{' '}
              </Text>
              <Text selectable style={[styles.cargas, { color: colors.text }]}>
                {ads.valor}
              </Text>
            </Text>
          ))}
        </View>
        {arrayIntegral.length > 0 && (
          <View>
            <View style={{ padding: 10 }} />
            <View
              style={{
                borderBottomColor: '#CFDCEF',
                borderBottomWidth: 20,
                width: valor,
              }}
            />
            <Text selectable style={[styles.conteudo, { color: colors.text }]}>
              {teste}
            </Text>
          </View>
        )}
        {arrayIntegral.length > 0 && (
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://sig.ifsudestemg.edu.br/static/arquivos/download/Regulamento_Academico_Graduacao.pdf',
                )
              }
            >
              <Text selectable style={[styles.conteudo, global.link]}>
                Regulamento dos Cursos de Graduação
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.ifsudestemg.edu.br/documentos-institucionais/calendarios/calendarios-academicos',
            )
          }
        >
          <Text selectable style={[styles.conteudo, global.link]}>
            Calendário Acadêmico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" onPress={mudarVinculo}>
          <Text selectable style={[styles.conteudo, global.link]}>
            Mudar vínculo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode(value => !value);
            saveTheme(mode);
            DeviceEventEmitter.emit('changeTheme', mode);
          }}
        >
          <Text selectable style={[styles.conteudo, global.link]}>
            Mudar para o tema {mode ? 'escuro' : 'claro'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" onPress={acaoSair}>
          <Text
            selectable
            style={[
              styles.conteudo,
              { color: 'rgb(255, 69, 58)', fontWeight: '700' },
            ]}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Constants.statusBarHeight + 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  cargas: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    paddingTop: 60,
    padding: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
export default Perfil;
