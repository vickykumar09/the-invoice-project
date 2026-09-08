import { gray, red } from "@/constants/color-palettes";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Option } from "../types";

type Props = {
  value: string;
  options: readonly Option[];
  onChange: (val: string) => void;
  clearable?: boolean;
};

export default function Selector({
  options,
  value,
  onChange,
  clearable,
}: Props) {
  return (
    <>
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
              <FontAwesome
                name={isSelected ? "circle" : "circle-o"}
                color={isSelected ? gray[9] : gray[5]}
                style={{ marginTop: 3 }}
              />
            </Pressable>
          );
        })}
      </View>

      {clearable && value !== "" && (
        <Text
          style={{ marginLeft: "auto", marginTop: 2, color: red[5] }}
          onPress={() => onChange("")}
        >
          Clear
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: gray[2],
    backgroundColor: gray[0],
  },
  selectedSegment: {
    backgroundColor: gray[1],
  },
  label: {
    fontSize: 15,
    color: gray[5],
  },
  selectedLabel: {
    fontWeight: "600",
    color: gray[9],
  },
});
