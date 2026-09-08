import { gray, orange } from "@/constants/color-palettes";
import { formatDateString } from "@/utils/date-time/format";
import { StyleSheet, Text, View } from "react-native";
import { InvoiceActivity } from "../../types";

export function ActivityRow({
  item,
  index,
  totalItems,
}: {
  item: InvoiceActivity;
  index: number;
  totalItems: number;
}) {
  return (
    <View style={styles.container}>
      {/* Left side (line + dot) */}
      <View style={styles.left}>
        <View style={styles.dot} />
        {index !== totalItems - 1 && <View style={styles.line} />}
      </View>

      {/* Right side content */}
      <View style={styles.right}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{formatDateString(item.created_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  left: {
    paddingHorizontal: 16,
    alignItems: "center",
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 99,
    backgroundColor: orange[6],
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: orange[2],
  },

  right: {
    flex: 1,
    paddingBottom: 32,
  },

  title: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "NunitoBold",
  },

  time: {
    fontSize: 14,
    color: gray[5],
  },
});
