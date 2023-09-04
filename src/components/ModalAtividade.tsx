import { useTheme } from '@react-navigation/native';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchData } from '../api/modal';
import { fechaModal, replaceAll } from '../utils/globalUtil';
import { Loading } from './Loading';
import ModalDownload from './ModalDownload';

export type PropsModal = {
  modalVisible: boolean;
  open: any;
  att: any;
  tipo: number;
  javax?: string;
};

const ModalAtividades: React.FC<PropsModal> = ({
  modalVisible,
  open,
  att,
  tipo,
  javax,
}) => {
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<HTMLElement[]>([]);
  const [linkTarefa, setLink] = useState('');
  const [modalVisibleD, setModalVisibleD] = useState(true);

  const [scrollOffset, setscrollOffset] = useState();
  const scrollViewRef = useRef<ScrollView>(null);
  const { colors } = useTheme();

  useEffect(() => {
    fetchData(att, setLoading, setContent, setLink, tipo, javax, controller);
  }, []);

  const close = () => {
    fechaModal(open, modalVisible, controller);
  };

  const handleOnScroll = (event: any) => {
    setscrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    att && (
      <>
        <Modal
          testID={'modal'}
          isVisible={!modalVisible}
          onSwipeComplete={close}
          swipeDirection={['down']}
          scrollTo={handleScrollTo}
          scrollOffset={scrollOffset}
          scrollOffsetMax={400 - 300}
          propagateSwipe={true}
          style={styles.modalView}
          avoidKeyboard
          hardwareAccelerated
          onBackButtonPress={close}
          onBackdropPress={close}
        >
          <View style={{ alignItems: 'center', backgroundColor: colors.card }}>
            <Icon name="window-minimize" size={25} color={colors.text} />
          </View>
          <View
            style={[styles.scrollableModal, { backgroundColor: colors.card }]}
          >
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleOnScroll}
              scrollEventThrottle={16}
            >
              {loading && <Loading />}
              {!loading && content.length > 1 && (
                <View>
                  <Text selectable>
                    <Text
                      selectable
                      style={[styles.textBold, { color: colors.text }]}
                    >
                      {replaceAll(content[0]?.textContent?.split(':')[0])}:
                    </Text>
                    <Text selectable style={{ color: colors.text }}>
                      {replaceAll(content[0]?.textContent?.split(':')[1])}
                    </Text>
                  </Text>
                  <Text selectable>
                    <Text
                      selectable
                      style={[styles.textBold, { color: colors.text }]}
                    >
                      {replaceAll(content[1]?.textContent?.split(':')[0])}:
                    </Text>
                    <Text selectable style={{ color: colors.text }}>
                      {replaceAll(content[1]?.textContent?.split(':')[1])}
                    </Text>
                  </Text>
                  <Text selectable>
                    <Text
                      selectable
                      style={[styles.textBold, { color: colors.text }]}
                    >
                      {replaceAll(content[3]?.textContent?.split(':')[0])}:
                    </Text>
                    <Text selectable style={{ color: colors.text }}>
                      {replaceAll(content[3]?.textContent?.split(':')[1])}
                    </Text>
                  </Text>
                  {!linkTarefa.includes('undefined') && (
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => setModalVisibleD(false)}
                    >
                      <Text selectable style={[styles.btnText]}>
                        Baixar arquivo enviado pelo professor
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </ScrollView>
            {!loading && content.length == 1 && (
              <Text selectable style={[styles.aviso, { color: colors.text }]}>
                {replaceAll(content[0]?.textContent)}
              </Text>
            )}
          </View>
        </Modal>
        {!modalVisibleD && (
          <ModalDownload
            modalVisible={modalVisibleD}
            open={setModalVisibleD}
            payload={linkTarefa}
            tipo="get"
          />
        )}
      </>
    )
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    padding: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    left: '38%',
    width: 33,
    position: 'relative',
    top: '7%',
    zIndex: 100,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    fontSize: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 5,
    backgroundColor: '#4683DF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  aviso: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ModalAtividades;
