import { gray } from "@/constants/color-palettes";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function FormGuidelines({
  points
}: { points?: string[] }) {
  if (!points?.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Guidelines</Text>
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 20,
    paddingHorizontal: 32,
    backgroundColor: 'white',
    borderTopColor: gray[2],
    borderTopWidth: 12
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10
  },
  headerTxt: {
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 20, 
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    fontSize: 20,
    fontFamily: "NunitoBold",
    color: gray[8],
    backgroundColor: gray[2],
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  text: {
    flex: 1,
    color: gray[6],
    fontSize: 14,
    lineHeight: 20,
  },
});
