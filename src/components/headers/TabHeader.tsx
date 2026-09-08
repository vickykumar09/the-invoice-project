import { gray, rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  label: string;
  onPress: () => void;
  onSearchPress: () => void;
};

export default function TabHeader({ label, onPress, onSearchPress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        globalStyles.flex_items_center_spaced_between,
        styles.container,
        { paddingTop: insets.top + 12 },
      ]}
    >
      <Text style={globalStyles.headerTitlePrimary}>{label}</Text>

      <View style={[globalStyles.flex_items_center, { gap: 32 }]}>
        <FontAwesome
          name="search"
          size={22}
          color={gray[7]}
          onPress={onSearchPress}
        />
        <FontAwesome name="plus" size={22} color={gray[7]} onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 4,
    backgroundColor: rose[2],
    borderBottomWidth: 1,
    borderBottomColor: gray[2],
  },
});
