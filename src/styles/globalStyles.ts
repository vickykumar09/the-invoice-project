import { gray, orange, rose } from "@/constants/color-palettes";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // Default Header Title
  headerTitlePrimary: {
    fontFamily: "NunitoExtraBold",
    fontSize: 24,
    color: rose[9],
  },
  headerTitleSecondary: {
    fontFamily: "NunitoBold",
    fontSize: 20,
    color: orange[8],
  },
  headerTitleStyle: {
    paddingHorizontal: 0,
    fontFamily: "NunitoBold",
    fontSize: 24,
    color: orange[9],
  },
  headerTitleTwo: {
    fontFamily: "NunitoExtraBold",
    fontSize: 20,
    color: rose[9],
  },

  // All Screens
  safeAreaView: {
    flex: 1,
    backgroundColor: gray[0],
  },
  parentContainer: {
    flex: 1,
    padding: 20,
    gap: 40,
    backgroundColor: gray[0],
  },
  container: {
    flex: 1,
    gap: 48,
    padding: 24,
    backgroundColor: "#fff",
  },

  invoiceContainer: {
    flex: 1,
    gap: 20,
  },

  // Section
  sectionContainer: {
    gap: 30,
  },
  sectionHeaderContainer: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontFamily: "NunitoBold",
    fontSize: 20,
  },
  sectionSubHeader: {
    fontWeight: 800,
  },

  // Card
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },

  // Icon Wrapper
  iconWrapper: {
    width: 40,
    alignSelf: "stretch",
    backgroundColor: gray[1],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // Flex Row
  flex_items_center_spaced_between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  flex_items_center: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Inputs
  inputLabel: {
    fontFamily: "NunitoBold",
    textTransform: "capitalize",
    fontSize: 16,
  },
  inputContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gray[2],
    backgroundColor: gray[0],
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: rose[8],
  },
  disabledInput: {
    borderWidth: 0,
  },

  // Card
  boxContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default globalStyles;
