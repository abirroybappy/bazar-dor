export function numeric(value) {
  const normalized = String(value ?? 0)
    .replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
    .replace(/,/g, "");
  const result = Number(normalized);
  return Number.isFinite(result) ? result : 0;
}
export function bn(value, digits = 0) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(numeric(value));
}
export function sortProducts(items, order) {
  return order === "default"
    ? [...items]
    : [...items].sort((a, b) =>
        order === "asc"
          ? numeric(a.today) - numeric(b.today)
          : numeric(b.today) - numeric(a.today),
      );
}
