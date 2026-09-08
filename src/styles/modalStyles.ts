import { gray } from "@/constants/color-palettes";
import { StyleSheet } from "react-native";

const modalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    width: "100%",
    maxHeight: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[3],
    backgroundColor: gray[2],
  },
  body: {
    padding: 20,
    gap: 36,
  },
  headerLabel: {
    fontFamily: "NunitoBold",
    fontSize: 18,
    color: gray[9],
  },
  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pathText: {
    fontSize: 16,
    flexShrink: 1,
    color: "#555",
  },
});

export default modalStyle;
