import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://sigaa-api.vercel.app/",
  timeout: 1000,
});

export const payloadUser = async () => {
  return {
    "user.login": await AsyncStorage.getItem("user"),
    "user.senha": await AsyncStorage.getItem("senha"),
  };
};
