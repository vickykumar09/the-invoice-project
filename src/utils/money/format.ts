/**
 * 
 * Formats numbers into Indian Rupee currency format.
 * Ensures consistent 2-decimal financial display for invoices.
 * 
*/

export function formatCurrency(amount: number) {
  if (!Number.isFinite(amount)) {
    return '₹0.00';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}