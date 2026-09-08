import { gray } from "@/constants/color-palettes";
import { ItemRowData } from "@/features/catalog/types";
import globalStyles from "@/styles/globalStyles";
import { getSmartTimestamp } from "@/utils/date-time/format";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  item: ItemRowData;
  selected?: boolean; // highlight color
  enableLongPress?: boolean; // optional longPress mode
  onPress: (id: string) => void;
  onLongPress?: (id: string) => void;
};

export default function ItemRow({
  item,
  selected = false,
  enableLongPress = true,
  onPress,
  onLongPress,
}: Props) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      android_ripple={{ color: gray[3] }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <View style={styles.section}>
        <View style={[globalStyles.flex_items_center, { flex: 1 }]}>
          <MaterialCommunityIcons
            name={item.type === "product" ? "package-variant" : "tools"}
            size={24}
            style={styles.avatar}
            onLongPress={
              enableLongPress && onLongPress
                ? () => onLongPress(item.id)
                : undefined
            }
            color={gray[7]}
          />

          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {item.name}
            </Text>
            {item.description ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.subtitle}
              >
                {item.description}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.subtitle}
              >
                No description added to this catalog item yet and no info
              </Text>
            )}
          </View>
        </View>
      </View>
      <Text style={{ textAlign: "right" }}>
        {getSmartTimestamp(item.updated_at)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.7,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  container: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  card: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
  },
  avatar: {
    backgroundColor: gray[2],
    borderRadius: 10,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: gray[7],
    textTransform: "capitalize",
  },
  subtitle: {
    color: gray[4],
    fontSize: 14,
  },
});
