export class Order {
	constructor(data = {}) {
		this.id = data.id || null;
		this.orderCode = data.orderCode || "";
		this.items = (data.items || []).map(item => ({
			productId: item.productId,
			productName: item.productName,
			quantity: item.quantity,
			price: item.price,
		}));
		this.totalAmount = data.totalAmount || 0;
		this.status = data.status || "Pending";
		this.createdAt = data.createdAt || new Date();
	}
}
