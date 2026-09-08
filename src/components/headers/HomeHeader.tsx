import { gray, rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        globalStyles.flex_items_center_spaced_between,
        styles.container,
        { paddingTop: insets.top + 12 },
      ]}
    >
      <View style={globalStyles.flex_items_center}>
        <Link href={"/"}>
          <Entypo name="menu" size={28} color={gray[7]} />
        </Link>
        <Text style={[globalStyles.headerTitlePrimary, { fontSize: 20 }]}>
          Businesses
        </Text>
      </View>

      <View style={[globalStyles.flex_items_center, { gap: 32 }]}>
        <Link href={"/"}>
          <FontAwesome name="bell-o" size={22} color={gray[7]} />
        </Link>
        <Link href={"/"}>
          <FontAwesome5 name="user" size={22} color={gray[7]} />
        </Link>
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
