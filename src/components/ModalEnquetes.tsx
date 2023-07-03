import { useTheme } from '@react-navigation/native';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useState } from 'react';
import {
  Modal,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getEnquete } from '../api/enquetes';
import { parseResultEnquete } from '../screens/Disciplina/MenuDisciplina/Enquetes/util';
import { replaceAll } from '../utils/globalUtil';
import { Loading } from './Loading';

export type PropsModal = {
  modalVisible: boolean;
  open: any;
  enquete: any;
  tipo: number;
};

const ModalEnquete: React.FC<PropsModal> = ({
  modalVisible,
  open,
  enquete,
  tipo,
}) => {
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<HTMLElement>();
  const { colors } = useTheme();

  let resultEnquete: any = [];

  useEffect(() => {
    getEnquete(enquete, setLoading, setContent, controller, tipo);
  }, []);
  const fun = () => {
    NativeModules.PythonModule.cancel();
    controller.abort();
    open(!modalVisible);
  };

  if (content) {
    resultEnquete = parseResultEnquete(content.querySelector('table.listing'));
    if (resultEnquete.length === 0) {
      resultEnquete = content
        .querySelector('ul.enquete')
        ?.textContent.split('\n');
      resultEnquete = resultEnquete.filter(function (el: any) {
        return el.trim() != '';
      });
    }
  }

  return (
    enquete && (
      <View style={[styles.centeredView]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!modalVisible}
          onRequestClose={() => fun()}
        >
          <View style={[styles.centeredView]}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.background }]}
              onPress={() => fun()}
            >
              <IconMaterialIcons name="close" color={colors.text} />
            </TouchableOpacity>
            <View style={[styles.modalView, { backgroundColor: colors.card }]}>
              {loading && <Loading />}
              {!loading && content && (
                <ScrollView style={{ height: '100%' }}>
                  {resultEnquete.map((ava: any) => (
                    <Text
                      selectable
                      style={{
                        color: colors.text,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                      key={ava.string || ava}
                    >
                      {(ava.string || ava).trim()}
                    </Text>
                  ))}
                </ScrollView>
              )}
              {!loading &&
                content &&
                content.querySelector('empty-listing') && (
                  <Text
                    selectable
                    style={[styles.aviso, { color: colors.text }]}
                  >
                    {replaceAll(
                      content.querySelector('empty-listing')?.textContent + '',
                    )}
                  </Text>
                )}
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '30%',
    zIndex: 90,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    left: '38%',
    width: 33,
    position: 'relative',
    top: '8%',
    zIndex: 100,
  },
  aviso: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ModalEnquete;
