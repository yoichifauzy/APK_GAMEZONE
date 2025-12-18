export function formatMoney(value) {
  const n = Number(value || 0);
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("id-ID");
  } catch {
    return String(iso || "");
  }
}
