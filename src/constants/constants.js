export const pageSizes = [20, 40, 60, 80, 100];

export const currencyType = [
  { label: 'Real', value: 'REAL' },
  { label: 'Test', value: 'TEST' },
];

export const auctionCurrency = [
  { label: 'INR', value: 'INR' },
  { label: 'USD', value: 'USD' },
];

export const orderOptions = [
  { column: 'asc', label: 'Ascending' },
  { column: 'desc', label: 'Descending' },
];

export const unitEnum = [
  { value: 'XPs', label: 'XPs' },
  { value: 'PERCENTAGE', label: 'PERCENTAGE' },
];


export function removeUnderScore(value) {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}