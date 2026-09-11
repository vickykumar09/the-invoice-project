import ModalHeader from "@/components/headers/ModalHeader";
import { gray, green, red } from "@/constants/color-palettes";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import React from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native";

import FormGuidelines from "@/components/common/FormGuidelines";
import TextLink from "@/components/ui/TextLink";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import { INVOICE_DISCOUNT_FIELDS } from "@/features/invoices/constants/form-fields/adjustments";
import { updateInvoiceDiscount } from "@/features/invoices/services/sqlite/adjustments";
import { InvoiceDiscount } from "@/features/invoices/types/invoice";
import { toInvoiceDiscountInsert } from "@/features/invoices/utils/mappers";
import Form from "@/form/Form";
import { FormController, FormErrors, FormValues } from "@/form/types";
import { validateForm } from "@/form/validators/form";
import { useModal } from "@/hooks/useModal";
import { showError, showSuccess } from "@/utils/alerts";
import { fromPaise } from "@/utils/money/convert";
import { FontAwesome } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/money/format";

type Props = {
  invoiceId: string;
  initialData: InvoiceDiscount;
  onChange: () => Promise<void>;
};

export default function InvoiceDiscountComponent({
  invoiceId,
  initialData,
  onChange,
}: Props) {
  const { visible, openModal, closeModal } = useModal();

  const {
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount,
  } = initialData;

  // Handle invoice discount update
  const handleUpdate = async (
    action: 'update' | 'clear',
    data: FormValues<InvoiceDiscount>,
    setErrors: React.Dispatch<React.SetStateAction<FormErrors<InvoiceDiscount>>>
  ) => {
    // 1. Validate form values
    if(action === 'update') {
      const formErrors = validateForm<InvoiceDiscount>(data, INVOICE_DISCOUNT_FIELDS);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
    }

    // 2. Convert form values to database insert values
    const insertData = toInvoiceDiscountInsert(data);

    // 3. Send database-ready data to SQLite
    try {
      const res = await updateInvoiceDiscount(invoiceId, insertData);

      if (!res.success) {
        Alert.alert("Update failed!", res.error?.message);
        setErrors(res?.error?.fields)
        return;
      }

      showSuccess(
        "Invoice discount updated successfully.",
        async () => { await onChange(); closeModal()}
      );
    } catch (e) {
      console.log(e);
      showError("Something went wrong. Please try again.");
    }
  };

  // Render Footer
  const renderFooter = ({
    data,
    setErrors
  }: FormController<InvoiceDiscount>) => {
    const showClearBtn = initialData.invoice_discount_type;
    return (
      <View style={[styles.footerContainer, { justifyContent: showClearBtn ? "space-between" : "center" }]}>
        {showClearBtn &&
          <TextLink
            text="Clear"
            size={18}
            color={red[6]}
            onPress={() => {
              const dt = {
                invoice_discount_type: '',
                invoice_discount_value: '',
                invoice_discount_amount: ''
              }

              handleUpdate('clear', dt, setErrors)
            }}
          />
        }
        <Text style={styles.btn} onPress={() => handleUpdate('update', data, setErrors)}>
          Apply
        </Text>
      </View>
    );
  };

  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Invoice Discount</Text>
        <TextLink text="Apply" size={16} onPress={openModal} />
      </View>

      <View style={globalStyles.flex_items_center}>
        <Text style={{ color: gray[5], textTransform: "capitalize" }}>
          {invoice_discount_type ?? "None"}
        </Text>
        <FontAwesome
          name="circle"
          size={5}
          color={gray[6]}
          style={{ marginTop: 4 }}
        />
        <Text style={{ color: gray[5] }}>
          {invoice_discount_type === "percentage"
            ? `${invoice_discount_value}%`
            : formatCurrency(fromPaise(invoice_discount_type === "fixed" ? invoice_discount_value : 0))
          }
        </Text>
      </View>

      {/* Modal - To set invoice discount value */}
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="Invoice Discount"
              onPress={closeModal}
            />
            <View style={{ backgroundColor: gray[0] }}>
              <Form<InvoiceDiscount>
                initialData={initialData}
                sections={[{ fields: INVOICE_DISCOUNT_FIELDS }]}
                fieldRenderer={itemFieldRenderer}
                renderFooter={renderFooter}
              />
              <FormGuidelines
                points={["Make sure to set the discount"]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: green[0],
    borderWidth: 1.5,
    borderColor: green[9],
    fontFamily: "NunitoExtraBold",
    color: green[9],
    paddingHorizontal: 20,
    paddingBottom: 8,
    fontSize: 15,
    paddingVertical: 6,
    borderRadius: 99,
  },
  footerContainer: {
    paddingBottom: 20,
    paddingTop: 8,
    paddingHorizontal: 32, 
    flexDirection: 'row',
    alignItems: 'center',
  }
});
