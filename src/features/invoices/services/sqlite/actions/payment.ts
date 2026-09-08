import { getDB } from "@/libs/db/database";
import * as Crypto from "expo-crypto";
import { businessInfo } from "@/constants/business";
import { FormField } from "@/form/types";
import { validateForm } from "@/form/validators/form";
import { Result } from "@/types/shared";
import { InvoicePayment } from "@/features/invoices/types";

// Add an Invoice Payment to Invoice Payments Table
export const insertInvoicePayment = async(
  fields: FormField<InvoicePayment>[],
  paymentData: InvoicePayment,
  invoiceId: string,
): Promise<Result<InvoicePayment>> => {
  // 1. Validate Input Fields
  const formErrors = validateForm<InvoicePayment>(paymentData, fields)  
  if (Object.keys(formErrors).length > 0) {
    return { 
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please correct the highlighted fields.",
        fields: formErrors
      }
    }
  }

  // 2. Calculate Values
  const now = new Date().toISOString();

  // 3. Set system-generated values
  const invoice: InvoicePayment = {
    ...paymentData,

    id: Crypto.randomUUID(),
    business_id: businessInfo.code,
    invoice_id: invoiceId,
    status: 'PENDING',
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  // 4. DB operation
  const columns = Object.keys(invoice);
  const values = Object.values(invoice);

  const placeholders = values.map(() => "?").join(", ");

  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO invoice_payments (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    )
    return {
      success: true, 
      data: invoice 
    };
  } catch (error) {
    console.log(error)
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to create invoice."
      }
    };
  }
}

// Delete an Invoice Payment
export const deleteInvoicePayments = async() => {
  try {
    const db = await getDB();
    await db.runAsync(
      `
      DELETE FROM invoice_payments
      WHERE paid_on = "{}"
      `
    )
  } catch (error) {
    throw error;
  }
}

// Get Payments of an invoice
export const getInvoicePayments = async(
  invoiceId: string
): Promise<InvoicePayment[]> => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync<InvoicePayment>(
      `
      SELECT *
      FROM invoice_payments
      WHERE invoice_id = ?
      ORDER BY paid_on DESC
      `,
      [invoiceId]
    )
    console.log(res, res.length)
    return res;
  } catch (error) {
    throw error;
  }
}

// Update an Invoice Payment Status