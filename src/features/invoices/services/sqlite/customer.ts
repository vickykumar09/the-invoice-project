import { getDB } from "@/libs/db/database";
import { Result } from "@/types/shared";
import {
  InvoiceCustomerData,
  InvoiceCustomerDisplay,
  InvoiceCustomerForm,
} from "../../types/customer";
import { validateCustomer } from "../../utils/validators/customer";

export const upsertInvoiceCustomer = async (
  invoiceId: string,
  insertData: InvoiceCustomerForm,
): Promise<Result<InvoiceCustomerData>> => {
  // 1. Calculate Values
  const now = new Date().toISOString();

  // 2. Generate Insert Customer Object
  const customer: InvoiceCustomerData = {
    ...insertData,
    invoice_id: invoiceId,
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  // 3. Validate Insert Item Object
  const errors = validateCustomer(customer);
  console.log(errors);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid invoice customer.",
        fields: errors,
      },
    };
  }

  // 4. DB operation
  const columns = Object.keys(customer);
  const values = Object.values(customer);

  const placeholders = values.map(() => "?").join(", ");

  const updateColumns = columns.filter(
    (column) =>
      column !== "invoice_id" &&
      column !== "created_at" &&
      column !== "is_synced",
  );

  const updateClause = updateColumns
    .map((column) => `${column} = excluded.${column}`)
    .join(", ");

  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      INSERT INTO invoice_customer (${columns.join(", ")})
      VALUES (${placeholders})
      ON CONFLICT (invoice_id)
      DO UPDATE SET
        ${updateClause}
      `,
      values,
    );

    if (res.changes === 0) {
      return {
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Could not update invoice customer.",
        },
      };
    }

    return {
      success: true,
      data: customer,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to update invoice customer.",
      },
    };
  }
};

// Get Invoice Customer
export const getInvoiceCustomer = async (
  invoiceId: string,
): Promise<InvoiceCustomerDisplay | null> => {
  try {
    const db = await getDB();
    const row = await db.getFirstAsync<InvoiceCustomerDisplay>(
      `
      SELECT
        ic.*,
        bill_state.name AS bill_to_state,
        ship_state.name AS ship_to_state
      FROM invoice_customer ic
      LEFT JOIN places_of_supply bill_state
        ON bill_state.code = ic.bill_to_state_code
      LEFT JOIN places_of_supply ship_state
        ON ship_state.code = ic.ship_to_state_code
      WHERE ic.invoice_id = ?;
      `,
      [invoiceId],
    );

    if (!row) return null;

    return {
      ...row,
      is_shipping_same_as_billing:
        Number(row.is_shipping_same_as_billing) === 1,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
