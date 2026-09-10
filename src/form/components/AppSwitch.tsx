import { gray, rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { StyleSheet, Switch, Text, View } from "react-native";

type Props = {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
};

export default function AppSwitch({
  label,
  description,
  value,
  onChange,
}: Props) {
  const isEnabled = value === 'true';

  return (
    <View style={globalStyles.flex_items_center_spaced_between}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.descriptionTxt, isEnabled ? styles.descriptionActive : styles.descriptionInactive]}
      >
        {description}
      </Text>
      <Switch
        accessibilityRole="switch"
        accessibilityLabel={label}
        value={isEnabled}
        onValueChange={(newValue) => onChange(String(newValue))}
        thumbColor={isEnabled ? rose[7] : gray[5]}
        trackColor={{
          true: rose[2],
          false: gray[2],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    borderRadius: 8,
    backgroundColor: gray[0],
    borderWidth: 1.5,
    borderColor: gray[2],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  descriptionTxt: {
    flex: 1,
    fontSize: 15,
    fontFamily: "NunitoBold",
  },
  descriptionActive: {
    color: gray[9],
  },
  descriptionInactive: {
    color: gray[5],
  },
});
