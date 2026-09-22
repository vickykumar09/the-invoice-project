import { blue, gray, green, lime, purple, red, rose } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import { fromPaise } from "@/utils/money/convert";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InvoiceItem } from "../../types/item";
import { useModal } from "@/hooks/useModal";
import modalStyle from "@/styles/modalStyles";
import ModalHeader from "@/components/headers/ModalHeader";
import { formatCurrency } from "@/utils/money/format";
import { InvoiceStatus, InvoiceType } from "../../types/invoice";
import InvoiceItemSummary from "../invoice/ItemSummary";
import { calculateInvoiceItemSummary } from "../../utils/calculators/invoiceItemSummary";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { deleteInvoiceItem } from "../../services/sqlite/item";
import { confirmDelete } from "@/utils/alerts";

type InvoiceItemRowProps = {
  invoice_id: string;
  invoice_status: InvoiceStatus;
  invoice_type: InvoiceType;
  is_igst: boolean,
  item: InvoiceItem;
  onDeleteItem: (itemId: string) => void;
};

export function InvoiceItemRow({
  invoice_id,
  invoice_status,
  invoice_type,
  is_igst,
  item,
  onDeleteItem
}: InvoiceItemRowProps) {
  const { visible, openModal, closeModal } = useModal();

  const summary = invoice_status === 'draft'
    ? calculateInvoiceItemSummary(item)
    : item;
  
  // Handle Invoice Item Deletion
  const handleInvoiceItemDelete = () => {
    const itemId = item.id
    const deleteItem = async () => {
      if (!itemId) {
        Alert.alert("Delete failed", "Invoice Item ID is missing.");
        return;
      }

      const result = await deleteInvoiceItem(itemId, invoice_id);

      if (!result.success) {
        Alert.alert("Delete failed", result.error?.message);
        return;
      }

      Alert.alert("Success", "Invoice Item deleted successfully", [
        {
          text: "OK",
          onPress: () => onDeleteItem(itemId),
        },
      ]);
    };

    confirmDelete("Item", deleteItem);
  };

  return (
    <>
      <Pressable onPress={openModal}>
        <View style={[globalStyles.cardContainer]}>
          {/* Top Row */}
          <View style={[globalStyles.flex_items_center_spaced_between]}>
            <Text style={{ fontWeight: 600, fontSize: 15, flexShrink: 1 }} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{ color: gray[9], fontSize: 15 }}>
              {formatCurrency(fromPaise(summary.total_amount))}
            </Text>
          </View>

          {/* Middle Row */}
          <View style={[globalStyles.flex_items_center_spaced_between, {marginBottom: 6}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Text style={{color: gray[6]}}>{formatCurrency(fromPaise(item.rate))} per {item.measure_unit_symbol}</Text>
              <Text style={{color: gray[4]}}>({item.rate_type && 'incl. gst'})</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Text style={{ color: gray[6] }}>{item.quantity}</Text>
              <Text style={{color: gray[4]}}>{item.measure_unit_symbol}</Text>  
            </View>
          </View>

          {/* Bottom Row */}
          {invoice_type === 'taxable' &&
            <View style={globalStyles.flex_items_center_spaced_between}>
              {item.discount_type &&
                <Text style={{ color: red[7], }}>
                  {item.discount_value}
                  {item.discount_type === "fixed"}
                  {item.discount_type === "percentage" && "%"} off
                </Text>
              }
              {item.tax_rate &&
                <Text style={{color: green[7]}}>{item.tax_rate}% GST</Text>
              }
            </View>
          }
        </View>
      </Pressable>

      {/* Modal to show item summary */}
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={closeModal}
      >
         <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="Summary"
              onPress={closeModal}
            />
            <ScrollView
              overScrollMode="never"
              bounces={false}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: gray[0]}}
            >
              <View style={{ padding: 20, gap: 20 }}>
                <InvoiceItemSummary
                  invoiceType={invoice_type}
                  isIgst={is_igst}
                  summary={summary}
                />
                {/* Delete Invoice Item Btn */}
                {invoice_status === 'draft' &&
                  <ActionBtn
                    variant="filled"
                    iconName="trash"
                    btnLabel="Delete"
                    rippleColor={red[2]}
                    color={red[7]}
                    onPress={handleInvoiceItemDelete}
                  />
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 16,
    fontFamily: "RajdhaniSemiBold",
  },
});
