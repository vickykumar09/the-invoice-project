import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Expo
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

// Components
import PageMessage from "@/components/common/PageMessage";
import ActionBtn from "@/components/ui/buttons/ActionBtn";

// Constants
import { gray, rose } from "@/constants/color-palettes";
import { INITIAL_INVOICE_STATE } from "@/features/invoices/constants/initial-states/invoice";
import { invoiceFormRenderer } from "@/features/invoices/constants/invoice-form-render";
import { INVOICE_TYPE_DETAILS } from "@/features/invoices/constants/invoice-types";

// Types
import { FormController, FormErrors, FormValues } from "@/form/types";

// Hooks, Libs & Utils
import { createInvoice } from "@/features/invoices/services/sqlite/invoice";
import { toInvoiceInsert } from "@/features/invoices/utils/mappers";
import { useConfirmBack } from "@/hooks/useConfirmBack";

import FormGuidelines from "@/components/common/FormGuidelines";
import {
  INVOICE_INFO_FIELDS,
  INVOICE_INFO_GUIDELINES,
} from "@/features/invoices/constants/form-fields/info";
import {
  InvoiceInfoProps,
  InvoiceType,
} from "@/features/invoices/types/invoice";
import Form from "@/form/Form";
import { validateForm } from "@/form/validators/form";
import globalStyles from "@/styles/globalStyles";
import { showError, showSuccess } from "@/utils/alerts";

export default function NewInvoiceScreen() {
  useConfirmBack();

  const router = useRouter();
  const { invoice_type } = useLocalSearchParams();

  // Handle Invoice Creation
  const handleCreateInvoice = async (
    data: FormValues<InvoiceInfoProps>,
    setErrors: React.Dispatch<
      React.SetStateAction<FormErrors<InvoiceInfoProps>>
    >,
  ) => {
    // 1. Validate form values
    const formErrors = validateForm<InvoiceInfoProps>(
      data,
      INVOICE_INFO_FIELDS,
    );
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // 2. Convert form values to database insert values
    const insertData = toInvoiceInsert(data);

    // 3. Send database-ready data to SQLite
    try {
      const res = await createInvoice(invoice_type as InvoiceType, insertData);
      if (!res.success) {
        if (res.error.code === "VALIDATION_ERROR") {
          setErrors(res.error.fields ?? {});
        }

        Alert.alert(res.error.message);
        return;
      }

      showSuccess("Invoice created successfully.", () =>
        router.replace(`/invoices/new/${res.data.id}`),
      );
    } catch (e) {
      console.log(e);
      showError("Something went wrong. Please try again.");
    }
  };

  // Render Footer
  const renderFooter = ({
    data,
    setErrors,
  }: FormController<InvoiceInfoProps>) => {
    return (
      <View style={styles.footerContainer}>
        <ActionBtn
          variant="filled"
          iconName="plus"
          btnLabel="Create"
          rippleColor={rose[0]}
          color={rose[8]}
          onPress={() => handleCreateInvoice(data, setErrors)}
        />
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `New ${INVOICE_TYPE_DETAILS[invoice_type as InvoiceType].title}`,
        }}
      />
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={globalStyles.safeAreaView}
      >
        <ScrollView
          overScrollMode="never"
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <PageMessage
              message="Enter the basic details below to create your invoice draft."
              withQuotes={true}
            />

            {/* Form */}
            <Form<InvoiceInfoProps>
              sections={[{ fields: INVOICE_INFO_FIELDS }]}
              initialData={INITIAL_INVOICE_STATE}
              fieldRenderer={invoiceFormRenderer}
              renderFooter={renderFooter}
            />

            {/* Form Guidelines */}
            <FormGuidelines points={INVOICE_INFO_GUIDELINES} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  section: {
    gap: 20,
    padding: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  footerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
});
