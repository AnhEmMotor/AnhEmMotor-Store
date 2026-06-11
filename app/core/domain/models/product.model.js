
export class Product {
	constructor(data = {}) {
		this.id = data.id || null;
		this.name = data.name || "";
		this.slug = data.slug || "";
		this.price = data.price || 0;
		this.originalPrice = data.originalPrice || 0;
		this.category = data.category || "";
		this.image = data.image || "/assets/image/placeholder-bike.webp";
		this.images = data.images || [];
		this.description = data.description || "";
		this.shortDescription = data.shortDescription || "";
		this.attributes = data.attributes || [];
		this.stock = data.stock || 0;
		this.isFeatured = !!data.isFeatured;
		this.isNew = !!data.isNew;
		this.brand = data.brand || null;
	}

	get formattedPrice() {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.price);
	}
}
