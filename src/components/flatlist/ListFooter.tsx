import { gray, rose } from "@/constants/color-palettes";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
};

export default function ListFooter({ text }: Props) {
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
    fontSize: 16,
    fontWeight: 600,
    color: rose[5],
  },
});
