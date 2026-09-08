import { getDB } from "@/libs/db/database";
import * as Crypto from "expo-crypto";
import { businessInfo } from "@/constants/business";
import { calculateInvoiceItemSummary } from "../../utils/calculators/invoiceItemSummary";
import { InvoiceItem, NewInvoiceItem } from "../../types/item";
import { Result } from "@/types/shared";


// Insert Invoice Item to an invoice
export const insertInvoiceItem = async (
  insertData: NewInvoiceItem,
  invoiceId: string,
  is_igst: boolean,
): Promise<Result<InvoiceItem>> => {
  // 1. Calculate Values
  const now = new Date().toISOString();
  
  const {
    quantity,
    rate,
    discount_type,
    discount_value,
    tax_rate,
    cess_type,
    cess_value
  } = insertData

  const summary = calculateInvoiceItemSummary({
    is_igst,
    quantity,
    rate,
    discount_type,
    discount_value,
    tax_rate,
    cess_type,
    cess_value
  })


  // 2. Generate Insert Item Object
  const invoiceItem: InvoiceItem = {
    ...insertData,
    ...summary,

    // System Generated Fields
    id: Crypto.randomUUID(),
    business_id: businessInfo.code,
    invoice_id: invoiceId,

    // System Generated
    created_at: now,
    updated_at: now,
    is_synced: false,
  };


  // 3. Validate Insert Item Object
  const errors = validateInvoiceItem(item);
  console.log(errors)

  // 4. DB operation
  const columns = Object.keys(invoiceItem);
  const values = Object.values(invoiceItem);

  const placeholders = values.map(() => "?").join(", ");

  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO invoice_items (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    )
    return {
      success: true, 
      data: invoiceItem 
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

export const updateInvoiceItem = async () => {

}

// // Update Invoice items on invoice isssuing
// export const updateInvoiceItems = async () => {
//   const items = []
//   // calculate invoice discount allocation  - pass subtotal, item summary

//   try {
//     const db = await getDB();
//     const result = await db.withTransactionAsync(async () => {
//       for (const item of items) {
//         const res = await db.runAsync(
//           `
//           UPDATE invoice_items_new
//           SET
//             invoice_discount_amount = ?,
//             coupon_discount_amount = ?,
//             taxable_amount = ?,
//             cgst_amount = ?,
//             sgst_amount = ?,
//             igst_amount = ?,
//             cess_amount = ?,
//             total_amount = ?,
//             updated_at = ?
//           WHERE
//             id = ?
//             AND invoice_id = ?
//             AND business_id = ?;
//           `,
//           [...]
//         );

//         if (res.changes !== 1) {
//           throw new Error("Failed to update invoice item");
//         }
//       }
//     });
    
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
//   // invoice discount amount
//   // coupon discount amount
//   // taxable amouunt
//   // cgst, sgst, igst, cess, total
//   // updated at
// }

// Delete Invoice Item
export const deleteInvoiceItem = async (invoiceItemId: string, invoiceId: string) => {
  try {
    const db = await getDB();
    db.runAsync(
      `
      DELETE
      FROM invoice_items
      WHERE id = ?
        AND invoice_id = ?
      `,
      [invoiceItemId, invoiceId]
    )
    console.log('success')
  } catch (error) {
    throw error
  }
}

// Get Invoice Items
export const getInvoiceItems = async (
  invoiceId: string
): Promise<InvoiceItem[]> => {
  try {
    const db = await getDB();
    const res = db.getAllAsync<InvoiceItem>(
      `
      SELECT *
      FROM invoice_items
      WHERE invoice_id = ?
      `,
      [invoiceId]
    )

    return res;
  } catch (error) {
    console.log(error)
    throw error
  }
}
