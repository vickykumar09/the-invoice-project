import { businessInfo } from "@/constants/business";
import { toDateString } from "@/utils/date-time/convert";
import { InvoiceInfoProps } from "../../types/invoice";

// Official way to store 8601 postgresql supported date strings
const now = new Date().toISOString();

export const INITIAL_INVOICE_STATE: InvoiceInfoProps = {
  invoice_date: toDateString(new Date()),
  place_of_supply: businessInfo.address.state_code,

  sales_channel: "WALK_IN",
  handled_by: businessInfo.name,
  order_id: null,
  order_date: null,
} as const;
