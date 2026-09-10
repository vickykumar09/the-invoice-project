import { InvoiceRoundOffMode } from "@/features/invoices/types/invoice";

/**
 * 
 * @param stateCode 
 * @returns The state label for the given state code if found or returns undefinded;
 */

export function getRoundOffSign(mode: InvoiceRoundOffMode) {
  switch (mode) {
    case 'up':
      return "+";

    case 'down':
      return "-";

    default:
      return "";
  }
}