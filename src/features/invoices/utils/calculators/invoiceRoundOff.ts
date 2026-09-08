

/**
 * Calculates the invoice grand total after applying the selected round-off mode.
 *
 * @param preRoundTotalPaise Invoice total before round off in paise. Must be greater than or equal to 0.
 * @param roundOffMode Selected round-off mode.
 * @returns The rounded grand total and round-off amount in paise.
 */

import { InvoiceRoundOffMode } from "../../types/invoice";

export function calculateInvoiceRoundOff(
  preRoundTotalPaise: number,
  roundOffMode: InvoiceRoundOffMode
) {
  if (preRoundTotalPaise < 0) {
    throw new Error("preRoundTotalPaise must be greater than or equal to 0.");
  }

  const remainder = preRoundTotalPaise % 100;
  let grandTotalPaise = preRoundTotalPaise;

  switch (roundOffMode) {
    case 'none':
      break;

    case 'down':
      grandTotalPaise -= remainder;
      break;

    case 'up':
      if (remainder !== 0) {
        grandTotalPaise += (100 - remainder);
      }
      break;
    
    default: {
      throw new Error(`Unsupported round off mode: ${roundOffMode}`);
    }
  }

  const roundOffAmountPaise = Math.abs(grandTotalPaise - preRoundTotalPaise);

  return {
    grandTotalPaise,
    roundOffAmountPaise,
  }
}