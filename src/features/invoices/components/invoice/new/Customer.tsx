import ModalHeader from "@/components/headers/ModalHeader";
import ActionBtn from "@/components/ui/buttons/ActionBtn";
import TextLink from "@/components/ui/TextLink";
import { blue, gray, rose } from "@/constants/color-palettes";
import { itemFieldRenderer } from "@/features/catalog/constants/ItemFormRenderer";
import {
  BILLING_FIELDS,
  SHIPPING_FIELDS,
  SHIPPING_SAME_AS_BILLING_FIELD,
} from "@/features/invoices/constants/form-fields/customer";
import { upsertInvoiceCustomer } from "@/features/invoices/services/sqlite/customer";
import {
  InvoiceCustomerData,
  InvoiceCustomerForm,
} from "@/features/invoices/types/customer";
import { toInvoiceCustomerInsert } from "@/features/invoices/utils/mappers";
import Form from "@/form/Form";
import { FormController, FormErrors, FormValues } from "@/form/types";
import { validateForm } from "@/form/validators/form";
import { useModal } from "@/hooks/useModal";
import modalStyle from "@/styles/modalStyles";
import { confirmDiscard, showError, showSuccess } from "@/utils/alerts";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, Modal, ScrollView, StyleSheet, View } from "react-native";

type Props = {
  invoiceId: string;
  initialData: InvoiceCustomerData | null;
  onChange: () => Promise<void>;
};

export default function InvoiceCustomerFormComponent({
  invoiceId,
  initialData,
  onChange,
}: Props) {
  const { visible, openModal, closeModal } = useModal();

  const formSections = [
    { title: "Billing Details", fields: BILLING_FIELDS },
    { fields: SHIPPING_SAME_AS_BILLING_FIELD },
    {
      title: "Shipping Details",
      fields: SHIPPING_FIELDS,
      showSection: (data) => data.is_shipping_same_as_billing === "true",
    },
  ];

  // Handle Invoice Creation
  const handleInvoiceCustomer = async (
    data: FormValues<InvoiceCustomerForm>,
    setErrors: React.Dispatch<
      React.SetStateAction<FormErrors<InvoiceCustomerForm>>
    >,
  ) => {
    console.log("hleo");
    const FIELDS = [...BILLING_FIELDS, ...SHIPPING_FIELDS];

    // 1. Validate form values
    const formErrors = validateForm<InvoiceCustomerForm>(data, FIELDS);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log("formErrors");
    // 2. Convert form values to database insert values
    const insertData = toInvoiceCustomerInsert(data);
    console.log("insertData", insertData);

    // 3. Send database-ready data to SQLite
    try {
      const res = await upsertInvoiceCustomer(invoiceId, insertData);
      if (!res.success) {
        if (res.error.code === "VALIDATION_ERROR") {
          setErrors(res.error.fields ?? {});
        }

        Alert.alert(res.error.message);
        return;
      }

      showSuccess(`Invoice customer updated successfully.`, closeModal);
    } catch (e) {
      console.log(e);
      showError("Something went wrong. Please try again.");
    }
  };

  // Render Footer
  const renderFooter = ({
    data,
    setErrors,
  }: FormController<InvoiceCustomerForm>) => {
    return (
      <View style={styles.footerContainer}>
        <ActionBtn
          variant="filled"
          iconName="plus"
          btnLabel="Add Item"
          rippleColor={rose[0]}
          color={rose[8]}
          onPress={() => handleInvoiceCustomer(data, setErrors)}
        />
      </View>
    );
  };

  return (
    <>
      {initialData ? (
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.linkContainer}>
            <Feather name="edit" size={16} color={blue[9]} />
            <TextLink text="Edit Customer" size={16} onPress={openModal} />
          </View>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Feather name="plus" size={20} color={blue[7]} />
            <TextLink
              text="Add Customer Details"
              size={17}
              onPress={openModal}
            />
          </View>
        </View>
      )}
      <View style={{ alignItems: "center" }}></View>

      {/* Modal - To set invoice discount value */}
      <Modal visible={visible} transparent statusBarTranslucent>
        <View style={modalStyle.overlay}>
          <View style={modalStyle.container}>
            <ModalHeader
              header="Customer Details"
              onPress={() => confirmDiscard(closeModal)}
            />
            <ScrollView
              overScrollMode="never"
              bounces={false}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: gray[0] }}
            >
              <Form<InvoiceCustomerForm>
                initialData={initialData ?? []}
                sections={formSections}
                fieldRenderer={itemFieldRenderer}
                renderFooter={renderFooter}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
});
