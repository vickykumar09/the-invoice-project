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

        <Stack.Screen
          name="dispatch"
          options={{
            headerTitle: "Dispatch",
          }}
        />

        <Stack.Screen
          name="history"
          options={{
            headerTitle: "History",
          }}
        />
        
        <Stack.Screen
          name="transactions"
          options={{
            headerShown: false
          }}
        />
        
        {/* Insights */}
        <Stack.Screen
          name="(insights)/preview"
          options={{
            headerTitle: "Invoice Preview",
          }}
        />
      </Stack>
    </InvoiceContext.Provider>
  );
}
