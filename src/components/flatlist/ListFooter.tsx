import { gray, rose } from "@/constants/color-palettes";
import { StyleSheet, Text, View } from "react-native";

export default function ListFooter({
  text
}: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.footerTxt}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: gray[1],
    backgroundColor: gray[0],
    alignItems: "center",
  },
  footerTxt: {
    color: gray[5],
  },
});
