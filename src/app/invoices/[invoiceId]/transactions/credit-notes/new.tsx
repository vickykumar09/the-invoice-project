import Separator from "@/components/flatlist/ItemSeparator";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { gray, green, orange } from "@/constants/color-palettes";
import { InvoiceHero } from "@/features/invoices/components/InvoiceHero";
import { InvoiceItemRow } from "@/features/invoices/components/rows/InvoiceItem";
import { getInvoiceItems } from "@/features/invoices/services/sqlite/item";
import { InvoiceItem } from "@/features/invoices/types/item";
import globalStyles from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CreditNoteItem = {
  invoice_item_id: string;
  credited_quantity: number;

  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total: number;
};

export default function NewCreditNoteScreen() {
  const { invoiceId } = useLocalSearchParams();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[] | null>(null);

  const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>([]);

  const toggleSection = (invoiceItem: InvoiceItem) => {
    setSelectedItems((prev) =>
      prev.includes(invoiceItem)
        ? prev.filter((item) => item !== invoiceItem)
        : [...prev, invoiceItem],
    );
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInvoiceItems(invoiceId as string);
        setInvoiceItems(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, [invoiceId]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <Pressable
          onPress={() => toggleSection(item)}
          style={globalStyles.flex_items_center_spaced_between}
        >
          <InvoiceItemRow item={item} selected={selectedItems.includes(item)} />
        </Pressable>
      );
    },
    [selectedItems],
  );
  return (
    <>
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <View style={{ flex: 1, gap: 0 }}>
          <InvoiceHero />
          <View
            style={{
              padding: 20,
              marginTop: 20,
              backgroundColor: orange[0],
              borderBottomWidth: 1,
              borderBottomColor: gray[2],
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Select Items</Text>
              <Text>Select quantities</Text>
              <Text>Review</Text>
            </View>
          </View>

          <FlatList
            data={invoiceItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
          />

          {/* {selectedItems.map((each) => {
            return (
              <View key={each.item_id} style={{padding: 20}}>
                <Text>{each.name}</Text>
                <View style={globalStyles.flex_items_center_spaced_between}>
                  <View>
                    <Text>Credit Qty: </Text>
                    <View style={[globalStyles.flex_items_center_spaced_between, {borderWidth: 1,  borderRadius: 6}]}>
                      <FontAwesome6 name='minus' style={{ padding: 10, paddingHorizontal:  16, borderRightWidth: 1, borderRightColor: 'black'}} size={20}/>
                      <Text style={{fontSize: 20, paddingHorizontal:  12}}>{each.quantity}</Text>
                      <FontAwesome6 name='plus' style={{padding: 10, paddingHorizontal:  16, borderLeftWidth: 1,}} size={20}/>
                    </View>
                  </View>
                  <View>
                    <Text>Credit Value</Text>
                    <Text>Credit Value</Text>
                  </View>
                </View>
              </View>
            )
          })} */}

          {/* Next Step Btn */}
          <View style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
            <ActionBtn
              variant="outlined"
              iconName="plus"
              btnLabel={`${selectedItems.length} items selected`}
              rippleColor={green[2]}
              color={green[7]}
              onPress={() => console.log("heloo")}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
