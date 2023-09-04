import { useBackHandler } from '@react-native-community/hooks';
import { useRoute, useTheme } from '@react-navigation/native';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { baixaTarefa } from '../api/tarefas';
import { handleBackButtonClick } from '../utils/globalUtil';
import { Loading } from './Loading';
import ModalDownload from './ModalDownload';
import WebView from './WebView';

const Resposta = () => {
  const controller = new AbortController();
  const [modalVisibleD, setModalVisibleD] = useState(true);

  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { colors } = useTheme();
  const [html, setHTML] = useState<HTMLElement>();
  const [link, setLink] = useState();
  const { json, form, javax, navigation }: any = route.params;

  useEffect(() => {
    baixaTarefa(
      json,
      form,
      javax,
      setLoading,
      navigation,
      setHTML,
      setLink,
      controller,
    );
  }, []);
  useBackHandler(() => handleBackButtonClick(controller, navigation));

  let fieldsets: any[] = [];
  if (html) {
    fieldsets = html?.querySelectorAll('fieldset');
  }
  return (
    <ScrollView style={[styles.safeArea]}>
      {loading && (
        <View
          style={{
            height: 250,
            marginTop: '60%',
          }}
        >
          <Loading />
        </View>
      )}
      {!loading && html && (
        <>
          <Text style={[styles.titulo, { color: colors.text }]}>
            {fieldsets.length > 0 &&
              fieldsets[0].querySelector('legend').textContent.trim()}
          </Text>
          <WebView body={fieldsets[0].querySelector('ul.form').innerHTML} />
          <View
            style={{
              marginTop: 20,
              borderBottomColor: colors.text,
              borderBottomWidth: 2,
            }}
          />
          {fieldsets.length > 0 && fieldsets[1] && (
            <>
              <Text style={[styles.titulo, { color: colors.text }]}>
                {fieldsets.length > 0 &&
                  fieldsets[1].querySelector('legend').textContent.trim()}
              </Text>
              <WebView body={fieldsets[1].querySelector('ul.form').innerHTML} />
            </>
          )}
        </>
      )}
      {link && (
        <ModalDownload
          modalVisible={modalVisibleD}
          open={setModalVisibleD}
          payload={link}
          tipo="get"
        />
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 3,
    marginBottom: 3,
  },
});
export default Resposta;
