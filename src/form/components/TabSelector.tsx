import { gray } from "@/constants/color-palettes";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Option } from "../types";

type TabSelectorProps = {
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
};

export default function TabSelector({
  options,
  value,
  onChange,
}: TabSelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            style={[styles.segment, isSelected && styles.selectedSegment]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: gray[0],
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 6,
  },
  selectedSegment: {
    backgroundColor: gray[2],
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedLabel: {
    fontWeight: "600",
  },
});
