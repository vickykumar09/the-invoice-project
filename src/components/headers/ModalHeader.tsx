import { gray, rose } from "@/constants/color-palettes";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import IconBtn from "../IconBtn";

export default function ModalHeader({
  header,
  onPress,
}: {
  header: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.headerLabel]} numberOfLines={1}>{header}</Text>
      <IconBtn icon={FontAwesome} name="close" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderBottomColor: gray[1],
    backgroundColor: rose[2],
  },
  headerLabel: {
    fontFamily: "NunitoExtraBold",
    fontSize: 18,
    color: rose[9],
  },
});
