export function formatCurrency(value) {
	if (!value) return "0 ₫";
	return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
