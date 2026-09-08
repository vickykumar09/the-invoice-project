import { rose } from "@/constants/color-palettes";
import { InvoiceContext } from "@/contexts/InvoiceContext";
import { getInvoice } from "@/features/invoices/services/sqlite/invoice";
import globalStyles from "@/styles/globalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function InvoiceLayout() {
  const { invoiceId } = useLocalSearchParams();

  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      if (!invoiceId) return;

      const data = await getInvoice(invoiceId as string);
      setInvoice(data);
      console.log("Invoice hero daata is loading");
    }

    loadData();
  }, [invoiceId]);

  return (
    <InvoiceContext.Provider value={{ invoice, setInvoice }}>
      <Stack
        screenOptions={{
          animation: "none",
          headerTitleAlign: "left",
          headerTitleStyle: globalStyles.headerTitleTwo,
          headerStyle: { backgroundColor: rose[2] },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: `Invoice Details`,
          }}
        />
        <Stack.Screen
          name="items"
          options={{
            headerTitle: `Invoice Items`,
          }}
        />

        {/* Insights */}
        <Stack.Screen
          name="(insights)/preview"
          options={{
            headerTitle: "Invoice Preview",
          }}
        />
        <Stack.Screen
          name="(insights)/history"
          options={{
            headerTitle: "Invoice History",
          }}
        />

        {/* Transactions */}
        <Stack.Screen
          name="(transactions)/payments"
          options={{
            headerTitle: "Invoice Payments",
          }}
        />
        <Stack.Screen
          name="(transactions)/refunds"
          options={{
            headerTitle: "Invoice Refunds",
          }}
        />

        {/* Credit Notes */}
        <Stack.Screen
          name="(transactions)/credit-notes/index"
          options={{
            headerTitle: "Invoice Credit Notes",
          }}
        />
        <Stack.Screen
          name="(transactions)/credit-notes/new"
          options={{
            headerTitle: "New Credit Note",
          }}
        />
        <Stack.Screen
          name="(transactions)/credit-notes/[creditNoteId]"
          options={{
            headerTitle: "Credit Note Details",
          }}
        />

        {/* Debit Notes */}
        <Stack.Screen
          name="(transactions)/debit-notes/index"
          options={{
            headerTitle: "Invoice Debit Notes",
          }}
        />
        <Stack.Screen
          name="(transactions)/debit-notes/new"
          options={{
            headerTitle: "New Debit Note",
          }}
        />
        <Stack.Screen
          name="(transactions)/debit-notes/[debitNoteId]"
          options={{
            headerTitle: "Debit Note Details",
          }}
        />
      </Stack>
    </InvoiceContext.Provider>
  );
}
