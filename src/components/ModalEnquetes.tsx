import { useTheme } from '@react-navigation/native';
import { HTMLElement } from 'node-html-parser';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEnquete } from '../api/enquetes';
import { parseResultEnquete } from '../screens/Disciplina/MenuDisciplina/Enquetes/util';
import { fechaModal, replaceAll } from '../utils/globalUtil';
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
  const [scrollOffset, setscrollOffset] = useState();
  const scrollViewRef = useRef<ScrollView>(null);

  let resultEnquete: any = [];

  useEffect(() => {
    getEnquete(enquete, setLoading, setContent, controller, tipo);
  }, []);

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
  const handleOnScroll = (event: any) => {
    setscrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const close = () => {
    fechaModal(open, modalVisible, controller);
  };
  return (
    enquete && (
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
            {!loading &&
              content &&
              resultEnquete.map((ava: any) => (
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
            {!loading && content && content.querySelector('empty-listing') && (
              <Text selectable style={[styles.aviso, { color: colors.text }]}>
                {replaceAll(
                  content.querySelector('empty-listing')?.textContent + '',
                )}
              </Text>
            )}
          </ScrollView>
        </View>
      </Modal>
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
