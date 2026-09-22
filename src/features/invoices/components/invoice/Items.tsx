import ListEmpty from "@/components/flatlist/ListEmpty";
import { gray } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { InvoiceItem } from "../../types/item";
import { InvoiceItemRow } from "../rows/InvoiceItem";
import ItemSeparator from "@/components/flatlist/ItemSeparator";
import { InvoiceStatus, InvoiceType } from "../../types/invoice";

type Props = {
  invoice_id: string;
  invoice_status: InvoiceStatus;
  invoice_type: InvoiceType;
  is_igst: boolean,
  items: InvoiceItem[];
  onDeleteItem: (itemId: string) => void;
};

export default function InvoiceItems({
  invoice_id,
  invoice_status,
  invoice_type,
  is_igst,
  items,
  onDeleteItem
}: Props) {
  // Render Item Component
  const renderItem = ({ item }) => {
    return (
      <InvoiceItemRow
        invoice_id={invoice_id}
        invoice_status={invoice_status}
        invoice_type={invoice_type}
        is_igst={is_igst}
        item={item}
        onDeleteItem={(itemId) => onDeleteItem(itemId)}
      />
    )
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
        <Text style={{ fontFamily: "NunitoBold", fontSize: 18 }}>{items.length}</Text>
      </View>

      <FlatList
        overScrollMode="never"
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ gap: 2 }}
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
