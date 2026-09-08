import { getDB } from "@/libs/db/database";
import { businessInfo } from "@/constants/business";
import * as Crypto from "expo-crypto";
import { InvoiceDispatch } from "@/features/invoices/types";


// ------ Insert Invoice Dispatch Details ------ //
export const insertInvoiceDispatchDetails = async (invoiceId: string) => {
  const now = new Date().toISOString();
  const invoice_dispatch: InvoiceDispatch = {
    // ...newInvoiceItem,

    // System Generated Fields
    id: Crypto.randomUUID(),
    invoice_id: invoiceId,

    transport_mode: 'road',
    transporter_name: '',
    vehicle_number: '',
    transport_document_number: '',
    eway_bill_number: '',

    dispatch_date: '',
    expected_delivery_date: '',

    remarks: '',

    // System Generated
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  const columns = Object.keys(invoice_dispatch);
  const values = Object.values(invoice_dispatch);

  const placeholders = values.map(() => "?").join(", ");

  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO invoice_items_new (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    )
    console.log('success')  
  } catch (error) {
    console.log(error)
    throw error
  }
}