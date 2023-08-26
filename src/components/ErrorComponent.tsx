import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTheme } from '@react-navigation/native';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const myErrorHandler = async (
  error: Error,
  info: { componentStack: string },
) => {
  const user = (await AsyncStorage.getItem('@sigaa:USER')) + '';
  const senha = (await AsyncStorage.getItem('@sigaa:SENHA')) + '';
  await crashlytics().setAttributes({
    user,
    senha,
    info: info.componentStack,
  });
};

function ErrorFallback({ resetErrorBoundary }: any) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: 'center', paddingBottom: 10 }}>
        <Icon name="error-outline" size={100} color={colors.text} />
        <Text style={{ color: colors.text, fontSize: 18 }}>
          Ops, algo deu errado!
        </Text>
        <Text style={{ color: colors.text, fontSize: 18 }}>
          Não se preocupe, estamos trabalhando para arrumar o mais rápido
          possível!
        </Text>
      </View>
      <Button title="Tente novamente" onPress={resetErrorBoundary} />
    </View>
  );
}
export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});
