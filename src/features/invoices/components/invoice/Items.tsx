import ListEmpty from "@/components/flatlist/ListEmpty";
import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { InvoiceItem } from "../../types/item";
import { InvoiceItemRow } from "../rows/InvoiceItem";

type Props = {
  items: InvoiceItem[];
  onDeleteItem?: (itemId: string) => void;
};

export default function InvoiceItems({ items, onDeleteItem }: Props) {
  // Render Item Component
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onLongPress={() => {
          Alert.alert(
            "Delete this invoice item ?",
            "Are you sure you want to delete this inovice item",
            [
              {
                text: "cancel",
                style: "cancel",
              },
              {
                text: "delete",
                style: "destructive",
                onPress: () => onDeleteItem(item.id),
              },
            ],
          );
        }}
      >
        <InvoiceItemRow item={item} />
      </Pressable>
    );
  };

  // Render Empty Component
  const renderEmpty = () => {
    return (
      <ListEmpty
        icon="inbox"
        title="No invoice items yet."
        subtitle="Create invoice items to view here"
      />
    );
  };

  return (
    <>
      <View
        style={[
          globalStyles.flex_items_center_spaced_between,
          styles.container,
        ]}
      >
        <Text style={{ fontFamily: "NunitoBold", fontSize: 18 }}>Items</Text>
        <Text style={{ fontFamily: "NunitoBold", fontSize: 18 }}>
          {items.length}
        </Text>
      </View>

      <FlatList
        overScrollMode="never"
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        contentContainerStyle={{ backgroundColor: gray[1], gap: 2 }}
        ListEmptyComponent={renderEmpty}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: gray[0],
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
  },
});
