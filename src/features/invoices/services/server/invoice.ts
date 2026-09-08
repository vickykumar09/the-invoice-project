import { Alert } from "react-native";
import { supabase } from "@/libs/api/supabase";

// Fetch all invoices associated with this business
export const fetchAllInvoices = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*, invoice_items (*)")
      .eq("business_id", id);

    console.log(data, data?.length, error);

    // Check for error
    if (error) {
      Alert.alert("❌ Error", error.message);
      return;
    }

    // Check for data existence
    if (!data || data.length === 0) {
      Alert.alert("⚠️ Not Found", "No data found.");
      return;
    }

    // setInvoices((prev) => [...prev, ...data]);
    Alert.alert("✅ Success");
    return;
  } catch (error) {
    console.log("error", error);
    Alert.alert("🚨 Something Error Occurred");
  }
};

// Fetch an invoice data
export const fetchInvoice = async () => {
  return;
};

// Create an invoice for a customer
export const createInvoice = async () => {
  try {
    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert([
        {
          invoice_type: "with tax",
          customer_id: "1fe06168-1f6c-40f8-8a7a-4628763f2ea0",
        },
      ])
      .select()
      .single();

    console.log(invoice, error);
    if (invoice) {
      // setInvoiceId(invoice.id);
    }
  } catch (error) {
    console.log(error);
    Alert.alert("error");
  }
};

// Add items to invoice
export const addInvoiceItem = async (invoiceId: string) => {
  try {
    const { data: items, error: itemsError } = await supabase
      .from("invoice_items")
      .insert([
        {
          invoice_id: invoiceId,
          product_id: "04d4e1ce-81db-4511-81a9-a752debe0032",
          unit_price: 500,
          quantity: 2,
          discount: 100,
        },
      ])
      .select();
    console.log(items, itemsError);
  } catch (error) {
    console.log(error);
  }
};
