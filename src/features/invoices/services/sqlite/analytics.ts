import { getDB } from "@/libs/db/database";
import { InvoiceActivity, InvoiceReview, MonthlyAnalyticsCardProps } from "../../types";

export const GET_INVOICES_BY_MONTH = `
  SELECT *
  FROM invoices
  WHERE created_at >= ?
  AND created_at < ?
  ORDER BY created_at DESC
  LIMIT ? OFFSET ?
`;


// ------ INVOICE ACTIVITIES ------

// Get Invoice Activities
export const getInvoiceActivity = async(invoice_id: string): Promise<InvoiceActivity[]> => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync<InvoiceActivity>(
      `
      SELECT *
      FROM invoice_activity
      WHERE invoice_id = ?
      ORDER BY created_at DESC;
      `,
      [invoice_id]
    )
    console.log(res, res.length)
    return res;
  } catch (error) {
    throw error;
  }
}

// Get Invoice Review
export const getInvoiceReview = async(invoice_id: string) => {
  try {
    const db = await getDB();
    const res = await db.getAllAsync<InvoiceReview>(
      `
      SELECT *
      FROM invoice_reviews
      WHERE invoice_id = ?
      `,
      [invoice_id]
    )
    console.log(res, res.length)
    return res[0];
  } catch (error) {
    throw error;
  }
}

function getMonthDateRange(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);

  const startDate =
    `${year}-${String(month).padStart(2, "0")}-01 00:00:00`;

  const nextMonth =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year, month: month + 1 };

  const endDate =
    `${nextMonth.year}-${String(nextMonth.month).padStart(2, "0")}-01 00:00:00`;

  return {
    startDate,
    endDate,
  };
}

type pissed  = {
  query?: string,
  offset?: number,
  limit?: number,
  monthKey: string
}

// Get Monthly Invoices - By date range filtering
export const getMonthlyInvoices = async({query, offset, limit, monthKey}: pissed) => {
  try {
    const db = await getDB();
    const { startDate, endDate } = getMonthDateRange(monthKey);

    const res = await db.getAllAsync(
      GET_INVOICES_BY_MONTH,
      [startDate, endDate, limit as number, offset as number]
    );
    
    return res
  } catch (error) {
    throw error  
  }
}

// Get monthly invoices - By converting created at into monthKey like '2026-02' and matching with monthKey)
// export const getMonthlyInvoices = async({query, offset, limit, monthKey}: pissed) => {
//   try {
//     const db = await getDB();
//     const res = await db.getAllAsync(
//       `
//       SELECT *
//       FROM invoices
//       WHERE strftime('%Y-%m', created_at) = ?
//       ORDER BY created_at DESC
//       `,
//       [monthKey]
//     )

//     return res;
    
//   } catch (error) {
//     throw error
//   }
// }

// Get invoices monthly analytics
function getMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);

  const date = new Date(year, month - 1);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}


type MonthlyAnalytics = {
  totalInvoices: number;
  totalAmount: number;
  averageInvoiceAmount: number;
};

export async function getMonthlyAnalytics(monthKey: string): Promise<MonthlyAnalytics> {
  const [year, month] = monthKey
    .split("-")
    .map(Number);

  const startDate =
    `${year}-${String(month).padStart(2, "0")}-01 00:00:00`;

  const nextMonth =
    month === 12
      ? { year: year + 1, month: 1 }
      : { year, month: month + 1 };

  const endDate =
    `${nextMonth.year}-${String(nextMonth.month).padStart(2, "0")}-01 00:00:00`;

  const db = await getDB();
  const result = await db.getFirstAsync<{
    total_invoices: number | null;
    total_amount: number | null;
    average_invoice_amount: number | null;
  }>(
    `
    SELECT
      COUNT(*) as total_invoices,
      COALESCE(SUM(final_total), 0) as total_amount,
      COALESCE(AVG(final_total), 0) as average_invoice_amount
    FROM invoices
    WHERE created_at >= ?
    AND created_at < ?
    `,
    [startDate, endDate]
  );

  return {
    totalInvoices: result?.total_invoices ?? 0,
    totalAmount: result?.total_amount ?? 0,
    averageInvoiceAmount: result?.average_invoice_amount ?? 0,
  };
}


type RawAnalytics = {
  month_key: string;
  total_invoices: number;
  total_amount: number;
};

function getLast13Months() {
  const months: {
    monthKey: string;
    monthLabel: string;
  }[] = [];

  const now = new Date();

  for (let i = 0; i < 13; i++) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const monthKey =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

    const monthLabel =
      date.toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      });

    months.push({
      monthKey,
      monthLabel,
    });
  }

  return months;
}

export async function getMonthlyCards(): Promise<MonthlyAnalyticsCardProps[]> {
  const months = getLast13Months();

  const db = await getDB();
  const analytics = await db.getAllAsync<RawAnalytics>(
      `
      SELECT
        strftime('%Y-%m', created_at) as month_key,
        COUNT(*) as total_invoices,
        COALESCE(SUM(final_total), 0) as total_amount
      FROM invoices
      GROUP BY month_key
      ORDER BY month_key DESC
      LIMIT 13
      `
    );

  return months.map((month) => {
    const found = analytics.find(
      (item) =>
        item.month_key === month.monthKey
    );

    return {
      monthKey: month.monthKey,
      monthLabel: month.monthLabel,
      totalInvoices: found?.total_invoices ?? 0,
      totalAmount: found?.total_amount ?? 0,
    };
  });
}
