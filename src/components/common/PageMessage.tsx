import { gray } from "@/constants/color-palettes";
import { StyleSheet, Text, View } from "react-native";

export default function PageMessage({
  message,
  withQuotes = false,
}: {
  message: string;
  withQuotes?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {withQuotes && "“"}
        {message}
        {withQuotes && "”"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  message: {
    fontSize: 16,
    fontFamily: "NunitoBold",
    textAlign: "center",
    color: gray[7],
  },
});
