import Constants from "expo-constants";
import { Dimensions, StyleSheet } from "react-native";

export const global = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Constants.statusBarHeight - 15,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  btn: {
    backgroundColor: "#4683DF",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  menuItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#CFDCEF",
    borderRadius: 6,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuItemText: {
    width: Dimensions.get("window").width - 135,
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  menuItemIcon: {
    fontSize: 30,
    fontWeight: "500",
    color: "#222",
  },
  titulo: {
    fontSize: 31,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  tituloCard: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tituloSmall: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
  },
  link: {
    color: "#0096c7",
  },
});
