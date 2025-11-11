// styles/style.ts
// [NUOVO] Foglio stili condiviso per l'app

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // [NUOVO] Contenitore base riutilizzabile nelle schermate
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // [NUOVO] Card estetica per la FlatList (A=2)
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dedede",
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  // [NUOVO] Tipografia per titolo e corpo del post
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },

  // [NUOVO] Riga azioni (es. pulsante Like nel dettaglio)
  actionsRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // [NUOVO] Pulsante base riutilizzabile
  btn: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
