import { getDB } from "@/libs/db/database";
import { businessInfo } from "@/constants/business";

// ------ QUERIES ------ //
export const INSERT_REFUND = `
  INSERT INTO refunds (
    id,
    business_id,
    invoice_id,
    credit_note_id,
    amount,
    method,
    reference_no,
    reason,
    notes,
    status,
    initiated_at,
    processed_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
`;

export const GET_REFUNDS_BY_INVOICE = `
  SELECT *
  FROM refunds
  WHERE invoice_id = ?
  ORDER BY initiated_at DESC
`;

export const UPDATE_REFUND_STATUS = `
  UPDATE refunds
  SET
    status = ?,
    processed_at = ?
  WHERE id = ?
`;


// Get Invoice Refunds
export const getInvoiceRefunds = async(invoice_id: string) => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync(
      GET_REFUNDS_BY_INVOICE,
      [invoice_id]
    )
    console.log(res, 'refunds')
    return res;
  } catch (error) {
    throw error;
  }
}

// Insert Invoice Refund
export const insertInvoiceRefund = async({params}: {params: any}) => {
  const id = `refund_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const amount = Number(params.amount)
  console.log(typeof amount)
  const isCash = params.method === 'cash';

  const status = isCash
    ? 'processed'
    : 'pending';

  const processedAt = isCash
    ? Math.floor(Date.now() / 1000)
    : null;

  try {
    const db = await getDB();
    const res = await db.runAsync(
      INSERT_REFUND,
      [
        id,
        businessInfo.code,
        params.invoice_id,
        params.credit_note_id,
        amount,
        params.method,
        params.reference_no,
        params.reason,
        params.notes,
        status,
        new Date().toISOString(),
        processedAt
      ]
    )
    console.log('success')
  } catch (error) {
    console.error(error)
    throw error;
  }
}
