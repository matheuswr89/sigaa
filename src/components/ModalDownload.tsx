import { useTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { donwloadDisciplina } from '../api/donwloadDisciplina';
import { downloadForum } from '../api/downloadForum';
import { downloadMenu } from '../api/downloadMenu';
import { fechaModal } from '../utils/globalUtil';
import { Loading } from './Loading';

export type PropsModal = {
  modalVisible: boolean;
  open: any;
  payload: any;
  tipo: string;
  javax?: any;
};

const ModalDownload: React.FC<PropsModal> = ({
  modalVisible,
  open,
  payload,
  tipo,
  javax,
}) => {
  const { colors } = useTheme();

  useEffect(() => {
    if (tipo === 'menu') {
      downloadMenu(payload, open, modalVisible);
    } else if (tipo === 'disciplina') {
      donwloadDisciplina(payload, javax, open, modalVisible);
    } else if (tipo === 'forum') {
      downloadForum(payload, open, modalVisible);
    }
  }, []);

  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!modalVisible}
        onRequestClose={() => fechaModal(open, modalVisible)}
      >
        <View style={[styles.centeredView]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.background }]}
            onPress={() => fechaModal(open, modalVisible)}
          >
            <IconMaterialIcons name="close" color={colors.text} />
          </TouchableOpacity>
          <View style={[styles.modalView, { backgroundColor: colors.card }]}>
            <Loading />
          </View>
        </View>
      </Modal>
    </View>
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
});
export default ModalDownload;
