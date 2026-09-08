import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label?: string;
  total: number;       // total value
  value: number;       // current/occupied value
  height?: number;
  width?: string;
  fillColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export default function ProgressBar({ label, total, value, height = 12, width = "100%", fillColor = "#4CAF50", backgroundColor = "#ccc", borderRadius = 6, }: Props) {
  const percentage = Math.min(Math.max(value / total, 0), 1) * 100;

  return (
    <View style={{ marginVertical: 6 }}>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <View
        style={[{ width, height, backgroundColor, borderRadius, overflow: "hidden" }]}
      >
        <View
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: fillColor,
          }}
        />
      </View>
    </View>
  );
}
