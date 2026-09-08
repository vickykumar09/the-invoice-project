import { getDB } from "@/libs/db/database";
import * as Crypto from "expo-crypto";
import { businessInfo } from "@/constants/business";
import { calculateInvoiceSummary } from "../../utils/calculators/invoiceSummary";
import { getInvoiceItemsForInvoice } from "./item";
import { Result } from "@/types/shared";
import { validateInvoice } from "../../utils/validators/invoice";
import { FetchFnParams } from "@/hooks/usePagination";
import { Invoice, InvoiceInfoProps, InvoiceType } from "../../types/invoice";
import { InvoiceItem } from "../../types/item";
import { InvoiceCardData } from "../../types";

// ------ Create Invoice ------ /
export const createInvoice = async (
  invoiceType: InvoiceType,
  insertData: InvoiceInfoProps
): Promise<Result<Partial<Invoice>>> => {
  // 1. Calculate Values
  const now = new Date().toISOString();
  const isSameState = insertData.place_of_supply === businessInfo.address.state_code;
  
  // 2. Generate Insert Item Object
  const invoice: Partial<Invoice> = {
    ...insertData,
    id: Crypto.randomUUID(),
    business_id: businessInfo.code,
    invoice_type: invoiceType,
    is_igst: !isSameState,
    status: "draft",
    payment_status: 'unpaid',
    created_at: now,
    updated_at: now,
    is_synced: false,
  };

  // 3. Validate Insert Item Object
  const errors = validateInvoice(invoice);
  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid catalog item.",
        fields: errors,
      },
    };
  }

  // 4. DB operation
  const columns = Object.keys(invoice);
  const values = Object.values(invoice);

  const placeholders = values.map(() => "?").join(", ");

  try {
    const db = await getDB();
    await db.runAsync(
      `
      INSERT INTO invoices (${columns.join(", ")})
      VALUES (${placeholders})
      `,
      values
    );

    return {
      success: true,
      data: invoice,
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
};

// ------ Delete Invoice ------ //
export const deleteInvoice = async (
  invoiceId: string
) => {
  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      DELETE
      FROM invoices
      WHERE status= 'draft'
        AND id = ?
      `,
      [invoiceId]
    )

    if (res.changes === 0) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND_ERROR",
          message: "Invoice not found",
        },
      };
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (e) {
    console.log(e)
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to delete invoice."
      }
    };
  }
}

// ------ Issue Invoice ------ //
export const issueInvoice = async (
  invoiceId: string,
  invoice: Invoice
): Promise<Result<Invoice>> => {

  // 1. Get invoice
  // 2. Verify it exists
  // 3. Verify status is draft
  // 4. Check invoice has at least one item
  // 5. Update status + issued_at
  // 6. Mark it for sync

  
      // Invoice Existence - status 
      // set issued_at and change status to issued
      // change the status of invoice to issued and then move it to sync to cloud along with its invoice Items
  // get invoiceitems
  const invoiceItems: InvoiceItem[] = await getInvoiceItemsForInvoice(invoiceId)

  // Check if there is any invoice item  associated or not
  const summary = calculateInvoiceSummary(
    invoiceItems,
    invoice
  )
  
  const now = new Date().toISOString();

  try {
    const db = await getDB();
    await db.runAsync(
      `
      UPDATE invoices_new
      SET
        subtotal = $subtotal,
        tax_total = $tax_total,
        grand_total = $grand_total,
        status = $status,
        updated_at = $updated_at
      WHERE id = $invoice_id;
      `,
      {
        ...summary,
        $subtotal: summary.subtotal,
        $invoice_id: invoice.id,
        $issued_at: new Date().toISOString(),
        $status: "issued",
        $updated_at: now,
      }
    );
    console.log('success')
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
        message: "Failed to issue invoice."
      }
    };
  }
}

// ------ Cancel Invoice ------ //
export const cancelInvoice = async (
  invoiceId: string
) => {
  const invoice = await getInvoice(invoiceId);

  if (!invoice) {
    return { 
      success: false, 
      error: {
        code: "NOT_FOUND_ERROR",
        message: "Invoice not found."
      }
    };
  }

  if (invoice.status !== "issued") {
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Only issued invoices can be cancelled."
      }
    };
  }

  if (invoice.payment_status !== "unpaid") {
    return { 
      success: false, 
      error: {
        code: "DATABASE_ERROR",
        message: "Invoice cannot be cancelled after payment."
      }
    };
  }

  const now = new Date().toISOString();

  try {
    const db = await getDB();
    const res = await db.runAsync(
      `
      UPDATE invoices
      SET
        cancelled_at = $cancelled_at
        updated_at = $updated_at
      WHERE id = $invoice_id;
      `,
      {
        $invoice_id: invoice.id,
        $cancelled_at: now,
        $updated_at: now,
      }
    );

    if(res.changes === 0) {
      return {
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Could not cancel invoice."
        }
      };
    }

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
        message: "Failed to cancel invoice."
      }
    };
  }
}

// ------ Get Invoice ------ //
export const getInvoice = async (
  invoiceId: string
) => {
  try {
    const db = await getDB();
    const res = await db.getFirstAsync<Invoice & { items_count: number }>(
      `
      SELECT
        invoices.*,
        COUNT(invoice_items.id) AS items_count
      FROM invoices

      LEFT JOIN invoice_items
        ON invoice_items.invoice_id = invoices.id

      WHERE invoices.id = ?

      GROUP BY invoices.id
      `,
      [invoiceId]
    );

    console.log(res);

    return res;
  } catch (error) {
    throw error;
  }
};

// Fetches catalog items with pagination and optional search query, ordered by latest update.
export const getInvoices = async({
  limit,
  offset,
  query
}: FetchFnParams): Promise<Invoice[]> => {
  try {
    const db = await getDB();
    const searchQuery = query?.trim();

    if(searchQuery) {
      return db.getAllAsync<Invoice>(
        `
        SELECT *
        FROM invoices
        WHERE bill_to_name LIKE ?
        ORDER BY updated_at DESC
        LIMIT ? OFFSET ?
        `,
        [`%${searchQuery}%`, limit, offset]
      );
    }

    const res = await db.getAllAsync<Invoice>(
      `
      SELECT *
      FROM invoices
      ORDER BY updated_at 
      DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    )
    return res;
  } catch (error) {
    throw error;
  }
}

// ------ Search Invoices ------ //
export const searchInvoices = async(params: {query: string, limit: number, offset: number}): Promise<InvoiceCardData[]> => {
  const {query, limit, offset} = params;

  if (!query.trim()) {
    return [];
  }

  try {
    const db = await getDB();
    const result = await db.getAllAsync<InvoiceCardData>(
      `
      SELECT *
      FROM invoices
      WHERE customer_name LIKE ?
      LIMIT ? OFFSET ?
      `,
      [`%${query}%`, 10, offset]
    )

    return result;
  } catch (error) {
    throw error;
  }
}
