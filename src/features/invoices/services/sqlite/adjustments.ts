import { getDB } from "@/libs/db/database";
import { InvoiceDiscount, InvoiceRoundOffMode } from "../../types/invoice";
import { validateDiscount } from "../../utils/validators/invoice";
import { Result } from "@/types/shared";

// ------ Update Invoice Discount ------ //
export const updateInvoiceDiscount = async (
  invoiceId: string,
  discountData: InvoiceDiscount
) => {
  // 1. Destructure & Calculate Values
  const {
    invoice_discount_type,
    invoice_discount_value,
    invoice_discount_amount
  } = discountData;
  
  const now = new Date().toISOString();

  // 2. Validate Discount
  const errors = validateDiscount(discountData);
  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid invoice discount.",
        fields: errors,
      }
    };
  }

  // 3. DB operation
  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      UPDATE invoices
      SET
        invoice_discount_type = ?,
        invoice_discount_value = ?,
        invoice_discount_amount = ?,
        updated_at = ?
      WHERE id = ?;
      `,
      [
        invoice_discount_type,
        invoice_discount_value,
        invoice_discount_amount,
        now,
        invoiceId
      ]
    )

    if(res.changes === 0) {
      return {
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Could not update invoice discount."
        }
      }
    };

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to create catalog item.",
      },
    };
  }
}

// ------ update Invoice Round Off Mode ------ //
export const updateInvoiceRoundOff = async(
  invoiceId: string,
  roundOffMode: InvoiceRoundOffMode
) => {
  // 1. Calculate Values
  const now = new Date().toISOString();

  // 4. DB operation
  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      UPDATE invoices
      SET
        round_off_mode = ?,
        round_off_amount= ?, 
        updated_at = ?
      WHERE id = ?
      `,
      [
        roundOffMode,
        now,
        invoiceId
      ]
    )

    if(res.changes === 0) {
      return {
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Could not update invoice discount."
        }
      }
    };

    return {
      success: true,
      data: undefined,
    };

  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to create catalog item.",
      },
    };
  }
}
