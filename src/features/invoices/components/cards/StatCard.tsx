import { StyleSheet, Text, View } from "react-native";

type StatCardType = {
  label: string;
  value: string | number;
  backgroundColor: string;
  borderColor: string;
  color: string;
};

export function StatCard({
  label,
  value,
  backgroundColor,
  borderColor,
  color,
}: StatCardType) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor, borderColor: borderColor },
      ]}
    >
      <Text style={[styles.value, { color: color }]}>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: 600,
  },
});
