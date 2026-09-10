import { gray } from "@/constants/color-palettes";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  textColor?: string;
  lineColor?: string;
};

export default function TextDivider({
  text,
  textColor = gray[6],
  lineColor = gray[2],
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  line: {
    flex: 1,
    height: 2,
  },
  text: {
    fontFamily: "NunitoExtraBold",
    fontSize: 20,
  },
});
