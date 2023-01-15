import {useTheme} from '@react-navigation/native';
import {HTMLElement} from 'node-html-parser';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {global} from '../../global';

export type PropsPerfil = {
  docente: HTMLElement;
};

const Perfil: React.FC<PropsPerfil> = ({docente}) => {
  let arrayAcademico = [];
  let arrayIntegral = [];
  let teste;
  let valor;
  const {colors} = useTheme();

  if (docente.querySelectorAll('table')[1]) {
    const tableAcameico = docente
      .querySelectorAll('table')[1]
      .querySelectorAll('tr');
    const tableIntegral = docente
      .querySelectorAll('table')[2]
      .querySelectorAll('tr');

    for (let i = 0; i < tableAcameico.length; i++) {
      if (tableAcameico[i].querySelectorAll('acronym')[0]?.attributes.title) {
        arrayAcademico.push({
          indice:
            tableAcameico[i].querySelectorAll('acronym')[0]?.attributes.title,
          valor: tableAcameico[i].querySelectorAll('td')[1]?.textContent,
        });
        arrayAcademico.push({
          indice:
            tableAcameico[i].querySelectorAll('acronym')[1]?.attributes.title,
          valor: tableAcameico[i].querySelectorAll('td')[3]?.textContent,
        });
      }
    }
    for (let i = 0; i < tableIntegral.length; i++) {
      arrayIntegral.push({
        name: tableIntegral[i].querySelectorAll('td')[0]?.textContent.trim(),
        valor: tableIntegral[i].querySelectorAll('td')[1]?.textContent.trim(),
      });
    }
    teste = arrayIntegral[arrayIntegral.length - 1].name;
    valor = teste.split('%')[0] + '%';
    arrayIntegral.pop();
    arrayIntegral.pop();
  }
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <View>
          <Text selectable style={[styles.titulo, {color: colors.text}]}>
            {docente.querySelector('p.info-docente > span')?.textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, {color: colors.text}]}>
            Matricula: {docente.querySelectorAll('td')[1].textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, {color: colors.text}]}>
            Curso:{' '}
            {docente
              .querySelectorAll('td')[3]
              .textContent.trim()
              .replace(/\t/g, '')
              .replace(/\n/, '')}
          </Text>
          <Text selectable style={[styles.titulo, {color: colors.text}]}>
            Nível: {docente.querySelectorAll('td')[5].textContent.trim()}
          </Text>
          <Text selectable style={[styles.titulo, {color: colors.text}]}>
            Entrada: {docente.querySelectorAll('td')[11].textContent.trim()}
          </Text>
          <View style={{padding: 10}} />
          {arrayAcademico.map(ads => (
            <Text selectable key={ads.indice}>
              <Text selectable style={[styles.cargas, {color: colors.text}]}>
                {ads.indice}:{' '}
              </Text>
              <Text selectable style={[styles.cargas, {color: colors.text}]}>
                {ads.valor}
              </Text>
            </Text>
          ))}
          <View style={{padding: 10}} />
          {arrayIntegral.map(ads => (
            <Text selectable key={ads.name}>
              <Text selectable style={[styles.cargas, {color: colors.text}]}>
                {ads.name}:{' '}
              </Text>
              <Text selectable style={[styles.cargas, {color: colors.text}]}>
                {ads.valor}
              </Text>
            </Text>
          ))}
        </View>
        {arrayIntegral.length > 0 && (
          <View>
            <View style={{padding: 10}} />
            <View
              style={{
                borderBottomColor: '#CFDCEF',
                borderBottomWidth: 20,
                width: valor,
              }}
            />
            <Text selectable style={[styles.conteudo, {color: colors.text}]}>
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
              }>
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
          }>
          <Text selectable style={[styles.conteudo, global.link]}>
            Calendário Acadêmico
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  cargas: {
    fontSize: 16,
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
