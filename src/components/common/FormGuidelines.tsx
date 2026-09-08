import { gray } from "@/constants/color-palettes";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function FormGuidelines({ points }: { points?: string[] }) {
  if (!points?.length) return null;

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.line} />
        <Text style={styles.title}>Guidelines</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.list}>
        {points.map((each, index) => (
          <View key={`${each}-${index}`} style={styles.item}>
            <FontAwesome
              name="circle"
              color={gray[5]}
              size={8}
              style={{ marginTop: 8 }}
            />
            <Text style={styles.text}>{each}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: gray[2],
  },

  title: {
    fontSize: 18,
    fontFamily: "NunitoBold",
  },

  list: {
    gap: 8,
    padding: 8,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  bullet: {
    color: gray[7],
    fontSize: 20,
  },

  text: {
    flex: 1,
    color: gray[6],
    fontSize: 14,
    lineHeight: 20,
  },
});
