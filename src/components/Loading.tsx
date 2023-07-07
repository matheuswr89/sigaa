import { useTheme } from '@react-navigation/native';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

export const Loading: React.FC<any> = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.containerLoading}>
      <ActivityIndicator size={120} color={colors.primary} />
      <Text selectable style={[styles.text, { color: colors.text }]}>
        Carregando...
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
