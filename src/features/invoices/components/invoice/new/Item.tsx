import FormGuidelines from "@/components/common/FormGuidelines";
import PageMessage from "@/components/common/PageMessage";
import ModalHeader from "@/components/headers/ModalHeader";
import { gray, rose } from "@/constants/color-palettes";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import { InvoiceType } from "@/features/invoices/types/invoice";
import { InvoiceItem } from "@/features/invoices/types/item";
import { calculateInvoiceItemSummary } from "@/features/invoices/utils/calculators/invoiceItemSummary";
import Form from "@/form/Form";
import { FormController } from "@/form/types";
import { useModal } from "@/hooks/useModal";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import { confirmDiscard } from "@/utils/alerts";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { INVOICE_ITEM_DISCOUNT_FIELDS, INVOICE_ITEM_FORM_FIELDS, INVOICE_ITEM_TAX_FORM_FIELDS } from "../../../constants/form-fields/item";
import { INITIAL_INVOICE_ITEM_STATE } from "../../../constants/initial-states/invoice-item";
import IconBtn from "@/components/IconBtn";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import { insertInvoiceItem } from "@/features/invoices/services/sqlite/item";
import InvoiceItemSummary from "../ItemSummary";
import Counter from "@/form/components/Counter";

type Props = {
  invoice_id: string;
  invoice_type: InvoiceType;
  is_igst: boolean;
  onAddItem: (item: InvoiceItem) => void;
};

export default function InvoiceItemComponent({
  invoice_id,
  invoice_type,
  is_igst,
  onAddItem,
}: Props) {
  const { visible, openModal, closeModal } = useModal();

  // Form Sections
  const formSections = [
    { title: "Basic Details", fields: INVOICE_ITEM_FORM_FIELDS },
    { title: "Discount Details", fields: INVOICE_ITEM_DISCOUNT_FIELDS },
    ...(invoice_type === 'taxable'
      ? [{ title: "Tax Details", fields: INVOICE_ITEM_TAX_FORM_FIELDS }]
      : [])
  ];

  // Render Footer
  const renderFooter = ({
    data,
    setErrors
  }: FormController<InvoiceItem>) => {
    const summary = calculateInvoiceItemSummary(data);

    return (
      <View style={styles.footerContainer}>
        <View style={styles.summaryContainer}>
          <Text style={{ fontFamily: "RajdhaniBold", fontSize: 20, letterSpacing: 0.5 }}>Summary</Text>
          <View style={{paddingHorizontal: 12 }}>
            <InvoiceItemSummary
              invoiceType={invoice_type}
              isIgst={is_igst}
              summary={summary}
            />
          </View>
        </View>
        <View style={[globalStyles.flex_items_center_spaced_between, {paddingHorizontal: 32, paddingVertical: 16, justifyContent: 'center'}]}>
          <ActionBtn
            size="medium"
            variant="filled"
            iconName="plus"
            btnLabel="ADD"
            rippleColor={rose[0]}
            color={rose[8]}
            onPress={() => handleSubmit(data)}
          />
        </View>
      </View>
    );
  };

  // Handle Invoice Item Addition
  const handleSubmit = async (data) => {
    if (!invoice_id) {
      Alert.alert("Delete failed", "Invoice Item ID is missing.");
      return;
    }

    const res = await insertInvoiceItem(data, invoice_id);
    if (!res.success) {
      // if (res.error.code === "VALIDATION_ERROR") {
      //   setErrors(res.error.fields ?? {});
      // }

      Alert.alert(res.error.message);
      return;
    }

    Alert.alert('success')

    onAddItem(data);
    closeModal();
  }

  return (
    <>
      <IconBtn
        icon={Feather}
        name="plus"
        size={28}
        color={rose[8]}
        onPress={openModal}
      />

      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => confirmDiscard(closeModal)}
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="New Invoice Item"
              onPress={() => confirmDiscard(closeModal)}
            />
            <ScrollView
              overScrollMode="never"
              bounces={false}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: gray[0] }}
            >
              <View style={{ gap: 12 }}>
                <Text style={{padding: 20, backgroundColor: 'white', textAlign: "center"}}>"This item will be added only to the current invoice and will not be saved to your catalog items."</Text>

                <Form<InvoiceItem>
                  initialData={INITIAL_INVOICE_ITEM_STATE}
                  sections={formSections}
                  fieldRenderer={itemFieldRenderer}
                  renderFooter={renderFooter}
                />
                <FormGuidelines
                  points={[
                    "Quantity must be a whole number or a decimal number (e.g., 5 or 5.25).",
                    "Quantity can be maximum of 999999.99.",
                    "Quantity must be a whole number or a decimal number (e.g., 5 or 5.25).",
                    "Quantity can be maximum of 999999.99.",
                    "Quantity must be a whole number or a decimal number (e.g., 5 or 5.25).",
                    "Quantity can be maximum of 999999.99.",
                    "Quantity must be a whole number or a decimal number (e.g., 5 or 5.25).",
                    "Quantity can be maximum of 999999.99.ff",
                  ]}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  itemTotalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: gray[2],
    backgroundColor: gray[0],
  },
  text: {
    fontSize: 18,
    fontFamily: "RajdhaniSemiBold",
  },
  titleTxt: {
    fontSize: 15,
    color: gray[6],
  },
  valueTxt: {
    fontSize: 16,
    fontFamily: "RajdhaniSemiBold",
  },
  footerContainer: {
    gap: 12,
  },
  summaryContainer: {
    gap: 16,
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: gray[1]
  },
});

// onChangeText
//     ↓
// validateInput()
//     ↓
// update state

// onBlur
//     ↓
// validateField()
//     ↓
// set field error

// Submit
//     ↓
// validateInvoiceItem() - FrontEnd & BackEnd
//     ↓
// save item
