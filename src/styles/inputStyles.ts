import { gray, red } from "@/constants/color-palettes";
import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
  container: {
    gap: 3,
  },

  // Label
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 15,
    fontFamily: "NunitoBold",
  },

  // Input
  inputContainer: {
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
  errorText: {
    color: red[6],
  },
  iconWrapper: {
    width: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: gray[1],
    borderLeftWidth: 1.5,
    borderLeftColor: gray[2],
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default inputStyles;
