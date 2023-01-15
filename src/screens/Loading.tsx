import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Loading: React.FC<any> = () => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie
        source={require('../../assets/loading.json')}
        autoPlay
        loop
        resizeMode="contain"
      />
      <Text selectable style={[styles.text, {color: colors.text}]}>
        Carregando...
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    marginTop: 135,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
