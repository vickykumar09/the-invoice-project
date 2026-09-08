import { gray } from "@/constants/color-palettes";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
};

export default function ListEmpty({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={icon as any}
        size={40}
        color={gray[7]}
        style={styles.iconWrapper}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
  iconWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: gray[1],
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: gray[7],
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    textAlign: "center",
    color: gray[5],
  },
});
