import { StyleSheet, Text, View } from "react-native";
import React from "react";

type BadgeProps = {
  label: string;
  backgroundColor: string;
  color: string;
};

export default function Badge({ label, backgroundColor, color }: BadgeProps) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, { color: color }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 999,
  },
  label: {
    fontSize: 11,
    // fontFamily: "NunitoBold",
    includeFontPadding: false,
    textAlignVertical: "center",
  }
});
