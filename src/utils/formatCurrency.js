export function formatCurrency(amount, currency = "₦") {
  return `${currency}${Number(amount).toLocaleString()}`;
}
