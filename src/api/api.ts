import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.103:8001",
  timeout: 1000,
});

export const payloadUser = async () => {
  return {
    "user.login": await AsyncStorage.getItem("user"),
    "user.senha": await AsyncStorage.getItem("senha"),
  };
};
