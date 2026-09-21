import { getDB } from "@/libs/db/database";
import * as Crypto from "expo-crypto";
import { businessInfo } from "@/constants/business";
import { calculateInvoiceItemSummary } from "../../utils/calculators/invoiceItemSummary";
import { InvoiceItem, NewInvoiceItem } from "../../types/item";
import { Result } from "@/types/shared";
import { validateInvoiceItem } from "../../utils/validators/item";
import { toPaise } from "@/utils/money/convert";


// Insert Invoice Item to an invoice
export const insertInvoiceItem = async (
  insertData: NewInvoiceItem,
  invoiceId: string
): Promise<Result<InvoiceItem>> => {
  // 1. Calculate Values
  const now = new Date().toISOString();

  // 2. Generate Insert Item Object
  const invoiceItem: InvoiceItem = {
    ...insertData,

    // System Generated Fields
    id: Crypto.randomUUID(),
    business_id: businessInfo.code,
    invoice_id: invoiceId,
    rate: toPaise(insertData.rate),

    // System Generated
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  // 3. Validate Insert Invoice Item Object
  const errors = validateInvoiceItem(invoiceItem);
  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid invoice item.",
        fields: errors,
      },
    };
  }

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
    }

  } catch (error) {
    console.log(error)
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to add invoice item."
      }
    };
  }
}

export const updateInvoiceItem = async () => {

}

// Update Invoice items on invoice isssuing
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
      SELECT 
        i.*,
        mu.name AS measure_unit_name,
        mu.symbol AS measure_unit_symbol
      FROM invoice_items i
      LEFT JOIN measure_units mu
        ON mu.id = i.measure_unit_id
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
