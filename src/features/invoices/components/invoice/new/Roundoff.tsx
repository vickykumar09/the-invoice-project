import FormGuidelines from "@/components/common/FormGuidelines";
import ModalHeader from "@/components/headers/ModalHeader";
import TextLink from "@/components/ui/TextLink";
import { gray, green, red, rose } from "@/constants/color-palettes";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import { INVOICE_ROUND_OFF_FIELDS } from "@/features/invoices/constants/form-fields/adjustments";
import { ROUND_OFF_MODES } from "@/features/invoices/constants/options/round-off-modes";
import { updateInvoiceRoundOff } from "@/features/invoices/services/sqlite/adjustments";
import { InvoiceRoundOff, InvoiceRoundOffMode } from "@/features/invoices/types/invoice";
import { calculateInvoiceRoundOff } from "@/features/invoices/utils/calculators/invoiceRoundOff";
import { toInvoiceRoundOffInsert } from "@/features/invoices/utils/mappers";
import Form from "@/form/Form";
import { FormController, FormErrors, FormValues } from "@/form/types";
import { validateForm } from "@/form/validators/form";
import { useModal } from "@/hooks/useModal";
import globalStyles from "@/styles/globalStyles";
import modalStyle from "@/styles/modalStyles";
import { showError, showSuccess } from "@/utils/alerts";
import { getRoundOffSign } from "@/utils/helpers/getRoundOffSign";
import { fromPaise } from "@/utils/money/convert";
import { formatCurrency } from "@/utils/money/format";
import { fetchTableData } from "@/utils/system/storage";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  invoiceId: string;
  initialData: InvoiceRoundOff;
  preRoundOffTotalInPaise: number;
  onChange: () => Promise<void>;
};

export default function InvoiceRoundOffComponent({
  invoiceId,
  initialData,
  preRoundOffTotalInPaise,
  onChange,
}: Props) {
  const { visible, openModal, closeModal } = useModal();
  const { round_off_mode, round_off_amount } = initialData;

  const handleUpdate = async (
    action: 'update' | 'clear',
    data: FormValues<InvoiceRoundOff>,
    setErrors: React.Dispatch<React.SetStateAction<FormErrors<InvoiceRoundOff>>>
  ) => {
    // 1. Validate form values
    if(action === 'update') {
      const formErrors = validateForm<InvoiceRoundOff>(data, INVOICE_ROUND_OFF_FIELDS);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
    }

    // 2. Convert form values to database insert values
    const insertData = toInvoiceRoundOffInsert(data);

    // 3. Send database-ready data to SQLite
    try {
      const res = await updateInvoiceRoundOff(invoiceId, insertData);

      if (!res.success) {
        Alert.alert("Update failed!", res.error?.message);
        setErrors(res?.error?.fields)
        return;
      }

      showSuccess(
        "Invoice round off updated successfully.",
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
  }: FormController<InvoiceRoundOff>) => {
    const showClearBtn = initialData.round_off_mode;

    const { grandTotalPaise, roundOffAmountPaise } = calculateInvoiceRoundOff(
      preRoundOffTotalInPaise,
      data.round_off_mode as InvoiceRoundOffMode,
    );
    
    // Round Off Summary
    const roundOffSummary = [
      { title: 'Current Total', value: formatCurrency(fromPaise(preRoundOffTotalInPaise)) },
      { title: 'Round Off', value: `${getRoundOffSign(data.round_off_mode)} ${formatCurrency(fromPaise(roundOffAmountPaise))}`},
      { title: 'Rounded Total', value: formatCurrency(fromPaise(grandTotalPaise)) },
    ]

    return (
      <>
        <View style={{paddingHorizontal: 32, paddingVertical: 20, gap: 12, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: gray[1]}}>
          {roundOffSummary.map((each) => {
            return (
              <View key={each.title} style={globalStyles.flex_items_center_spaced_between}>
                <Text style={{ fontSize: 15, color: gray[5] }}>{each.title}</Text>
                <Text>{each.value}</Text>
              </View>
            )
          })}
        </View>
        <View style={[styles.footerContainer, { justifyContent: showClearBtn ? "space-between" : "center" }]}>
          {showClearBtn &&
            <TextLink
              text="Clear"
              size={18}
              color={red[6]}
              onPress={() => {
                const dt = {
                  round_off_mode: '',
                  round_off_amoutn: ''
                }

                handleUpdate()
              }}
            />
          }
          <Text style={styles.btn} onPress={() => fetchTableData('invoice_customer')}>
            Apply
          </Text>
        </View>
      </>
    );
  };

  return (
    <View>
      <View style={globalStyles.flex_items_center_spaced_between}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Roundoff</Text>
        <TextLink text="Apply" size={16} onPress={openModal} />
      </View>

      <View style={globalStyles.flex_items_center}>
        <Text style={{ color: gray[5], textTransform: "capitalize" }}>
          {round_off_mode ?? "None"}
        </Text>
        <FontAwesome
          name="circle"
          size={5}
          color={gray[6]}
          style={{ marginTop: 4 }}
        />
        <Text style={{ color: gray[5] }}>
          {getRoundOffSign(round_off_mode)}
          {formatCurrency(fromPaise(round_off_amount))}
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
              header="Round Off"
              onPress={closeModal}
            />
            <View style={{ backgroundColor: gray[0] }}>
              <Form<InvoiceRoundOff>
                initialData={initialData}
                sections={[{ fields: INVOICE_ROUND_OFF_FIELDS }]}
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
