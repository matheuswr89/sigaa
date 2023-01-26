import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import {
  EncodingType,
  StorageAccessFramework,
  writeAsStringAsync,
} from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { shareAsync } from "expo-sharing";
import { Alert, Platform, ToastAndroid } from "react-native";

export const formBody = (payload: any) =>
  Object.keys(payload)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
    )
    .join("&");

export const formBodyJson = (payload: any) =>
  Object.keys(payload)
    .map((key) => key + "=" + payload[key])
    .join("&");

export async function set() {
  await AsyncStorage.setItem("back", "true");
}

export async function setTipoAluno(tipo = "graduacao") {
  await AsyncStorage.setItem("tipoAluno", tipo);
}

export const saveFile = async (file: string, type: string, data: string) => {
  let local = await AsyncStorage.getItem("local");
  if (local === null) {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }
    local = permissions.directoryUri;
    await AsyncStorage.setItem("local", permissions.directoryUri);
  }
  StorageAccessFramework.createFileAsync(local, file, type)
    .then(async (uri) => {
      writeAsStringAsync(uri, Buffer.from(data, "binary").toString("base64"), {
        encoding: EncodingType.Base64,
      })
        .then(() => {
          let assetUriParts = uri.split("/");
          let assetName = assetUriParts[assetUriParts.length - 1];
          let url = `${local}/${assetName}`;

          Alert.alert("Arquivo baixado com suceso!", "Deseja abrir ele?", [
            {
              text: "Cancelar",
            },
            {
              text: "Abrir",
              onPress: () => openFile(uri, type),
            },
          ]);
        })
        .catch(() => {
          Alert.alert(
            "Erro",
            "Erro ao baixar o arquivo, tente novamente mais tarde."
          );
        });
    })
    .catch((e) => {});
};

const openFile = async (fileUri: string, type: string) => {
  try {
    if (Platform.OS === "android") {
      await startActivityAsync("android.intent.action.VIEW", {
        data: fileUri,
        flags: 1,
        type,
      });
    } else {
      await shareAsync(fileUri, {
        UTI: type,
        mimeType: type,
      });
    }
  } catch (error) {
    Alert.alert(
      "Erro",
      "Não tem um aplicativo disponível para abrir esse arquivo."
    );
  }
};

export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && (isFinite(n) || Number.isInteger(n));
}

export function handleBackButtonClick(controller: any, navigation: any) {
  set();
  controller.abort();
  navigation.goBack();
  return true;
}

export const exibeToast = () => {
  ToastAndroid.showWithGravity(
    "Baixando o arquivo, agurade um momento...",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
