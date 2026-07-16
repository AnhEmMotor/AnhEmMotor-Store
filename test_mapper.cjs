const axios = require('axios');

const getImageUrl = (path) => {
	if (!path) return "/assets/image/placeholder-product.webp";
	if (typeof path === "string" && path.includes(",")) {
		path = path.split(",")[0].trim();
	}
	if (path.startsWith("http") || path.startsWith("data:")) return path;
	return path;
};

const productMapper = {
	mapProductList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapProductItem(item));
	},

	mapProductItem(raw) {
		try {
			const variants = (raw.variants || []).map((v) => {
				if (!v) {
					console.error("Null variant found in product:", raw.id);
					return null;
				}
				return {
					...v,
					id: v.id || v.Id,
					url: v.url || v.url_slug || v.urlSlug,
					url_slug: v.url_slug || v.urlSlug || v.url,
					option_values_text:
						v.option_values_text ||
						v.optionValuesText ||
						v.propertyName ||
						v.variant_name,
					image: getImageUrl(v.image || v.cover_image_url),
					cover_image_url: getImageUrl(v.cover_image_url || v.image),
					colors: (v.colors || []).map((c) => ({
						id: c.id || c.Id,
						name: c.colorName || c.color_name || c.name,
						colorName: c.colorName || c.color_name || c.name,
						code: c.colorCode || c.color_code || c.code || "#ccc",
						colorCode: c.colorCode || c.color_code || c.code || "#ccc",
						image: getImageUrl(
							c.coverImageUrl || c.cover_image_url || c.image || v.cover_image_url,
						),
						coverImageUrl: getImageUrl(
							c.coverImageUrl || c.cover_image_url || c.image || v.cover_image_url,
						),
						maxPurchaseQuantity: c.maxPurchaseQuantity,
						effectiveMax:
							c.maxPurchaseQuantity ??
							v.effectiveMax ??
							v.productLimit ??
							v.product_limit ??
							null,
					})),
					effectiveMax: v.effectiveMax ?? v.productLimit ?? v.product_limit ?? null,
					productLimit: v.productLimit ?? v.product_limit ?? null,
				};
			});

			return {
				id: raw.id,
				name: raw.name,
				slug: raw.slug || variants[0]?.url || "",
				price: raw.price || variants[0]?.price || 0,
				originalPrice: raw.originalPrice || 0,
				discount: raw.discount || 0,
				image: getImageUrl(
					raw.thumbnailUrl || variants[0]?.image || variants[0]?.cover_image_url,
				),
				categoryId: raw.categoryId ?? raw.category_id ?? null,
				category:
					raw.categoryName ||
					(typeof raw.category === "string"
						? raw.category
						: raw.category?.name) ||
					"",
				brandId: raw.brandId ?? raw.brand_id ?? null,
				brand: raw.brand || "",
				type: raw.type || "",
				rating: raw.rating || 5,
				reviews: raw.reviewsCount || 0,
				inventoryStatus: raw.inventoryStatus,
				productLimit: raw.productLimit ?? raw.product_limit ?? null,
				effectiveMax:
					raw.effectiveMax ?? raw.productLimit ?? raw.product_limit ?? null,
				variants: variants,
			};
		} catch (err) {
			console.error("Error mapping product:", raw.id, err);
			throw err;
		}
	}
};

axios.get('http://localhost:5000/api/v1/product?pageSize=200')
	.then(res => {
		console.log("Fetched products:", res.data.items.length);
		const mapped = productMapper.mapProductList(res.data.items);
		console.log("Mapped successfully:", mapped.length);
	})
	.catch(err => {
		console.error("API call error:", err.message);
	});
