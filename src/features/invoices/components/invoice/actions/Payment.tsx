import ModalHeader from "@/components/headers/ModalHeader";
import { rose } from "@/constants/color-palettes";
import { PAYMENT_FORM_FIELDS } from "@/features/invoices/constants/form-fields/payment";
import { INITIAL_INVOICE_PAYMENT_STATE } from "@/features/invoices/constants/initial-states/payment";
import modalStyle from "@/styles/modalStyles";
import { Feather } from "@expo/vector-icons";
import { Modal, ScrollView, Text, View } from "react-native";
import { InvoicePayment } from "../../../types";

import FormGuidelines from "@/components/common/FormGuidelines";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import Form from "@/form/Form";
import { useModal } from "@/hooks/useModal";
import { confirmDiscard } from "@/utils/alerts";

type Props = {
  invoiceId: string;
};

export default function NewPaymentComponent({ invoiceId }: Props) {
  const { visible, openModal, closeModal } = useModal();

  // Handle Invoice Item Addition
  // const handleSubmit = async () => {
  //   const formErrors = validateForm<InvoicePayment>(data, PAYMENT_FORM_FIELDS)
  //   console.log(formErrors)
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors)
  //     return;
  //   }

  //   try {
  //     const res = await insertInvoicePayment(PAYMENT_FORM_FIELDS, data, invoiceId as string);
  //     if (!res.success) {
  //       if (res.error.code === "VALIDATION_ERROR") {
  //         setErrors(res.error.fields ?? {});
  //       }

  //       Alert.alert(res.error.message);
  //       return;
  //     }

  //     closeModal();
  //   } catch (error) {
  //     Alert.alert(
  //       "Unexpected Error",
  //       "Something went wrong. Please try again."
  //     );
  //   }
  // }

  return (
    <>
      <Feather name="plus" size={28} color={rose[8]} onPress={openModal} />

      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="New Payment"
              onPress={() => confirmDiscard(closeModal)}
            />
            <ScrollView>
              <View style={{ padding: 20, gap: 30 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "NunitoBold",
                  }}
                >
                  “Enter the payment details below.”
                </Text>

                <Form<InvoicePayment>
                  initialData={INITIAL_INVOICE_PAYMENT_STATE}
                  sections={[{ fields: PAYMENT_FORM_FIELDS }]}
                  fieldRenderer={itemFieldRenderer}
                  renderFooter={({ data, setErrors }) => {
                    return (
                      <View>
                        <Text>Heloo</Text>
                      </View>
                    );
                  }}
                />

                <FormGuidelines
                  points={[
                    "Quantity must be a whole number or a decimal number (e.g., 5 or 5.25).",
                    "Quantity can be maximum of 999999.99.",
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
