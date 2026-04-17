const productMapper = {
	mapProductList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapProductItem(item));
	},

	mapProductItem(raw) {
		const price = raw.variants?.[0]?.price || 0;
		const installmentAmount = Math.floor(price * 0.1 / 1000000) * 1000000;
		const remaining = price - installmentAmount;
		const monthlyInstallment = Math.round((remaining / 36) + (remaining * 0.008)); // 36 months, ~0.8% interest

		const isHot = raw.has_been_booked > 10;
		const isBestSeller = raw.has_been_booked > 15;
		const isGoodPrice = price < 50000000 && price > 0;
		const isNew = raw.id > 10;
		
		const nameLower = raw.name?.toLowerCase() || "";
		const hasABS = nameLower.includes("abs") || raw.displacement > 150;
		const isEco = nameLower.includes("vision") || nameLower.includes("sh") || raw.fuel_consumption < 2;
		const hasPGMFI = true; // Most modern bikes have it

		return {
			id: raw.id,
			name: raw.name,
			slug: raw.variants?.[0]?.url || "",
			price,
			installmentAmount: installmentAmount || 5000000,
			monthlyInstallment: Math.round(monthlyInstallment / 100000) * 100000,
			originalPrice: 0,
			discountPercent: 0,
			image: raw.variants?.[0]?.image || "/assets/image/placeholder-product.webp",
			category: raw.category?.name || "XE MÁY",
			brand: raw.brand?.name || "HONDA",
			type: raw.type || "",
			variants: (raw.variants || []).map(v => ({
				...v,
				propertyName: v.display_name || v.name || "Tiêu chuẩn",
				originalPrice: 0,
				discountPercent: 0
			})),
			isHot,
			isBestSeller,
			isGoodPrice,
			isNew,
			displacement: raw.displacement || 110,
			hasABS,
			isEco,
			hasPGMFI,
			inStock: raw.id % 2 === 0 // Dynamic stock for demo
		};
	},


	mapOptions(rawOptions) {
		if (!rawOptions || !Array.isArray(rawOptions)) return [];
		return rawOptions.map((option) => ({
			id: option.id,
			name: option.name,
			values: (option.values || []).map((val) => ({
				id: val.id,
				name: val.value || val.name || "",
				colorCode: val.colorCode || val.color_code || null,
			})),
		}));
	},

	mapProductDetail(raw, attributeLabels = null) {
		if (!raw || !raw.product) return null;
		const product = raw.product;
		const currentVariant = raw.current_variant || {};
		const otherVariants = (raw.other_variants || []).map((v) => ({
			slug: v.slug,
			display_name: v.display_name,
			price: v.price,
		}));
		const photos = [];
		if (currentVariant.cover_image_url) {
			photos.push(currentVariant.cover_image_url);
		}
		if (currentVariant.photo_collection?.length > 0) {
			const otherPhotos = currentVariant.photo_collection.filter(
				(p) => p !== currentVariant.cover_image_url,
			);
			photos.push(...otherPhotos);
		}
		let specifications = [];
		if (attributeLabels) {
			specifications = Object.entries(product)
				.filter(
					([key, value]) =>
						attributeLabels[key] &&
						value !== null &&
						value !== undefined &&
						value !== "",
				)
				.map(([key, value]) => ({
					key,
					label: attributeLabels[key],
					value: value,
				}));
		}
		return {
			product: {
				id: product.id,
				name: product.name,
				description: product.description,
				shortDescription: product.short_description,
				brand: product.brand,
				category: product.category,
				metaTitle: product.meta_title,
				metaDescription: product.meta_description,
			},
			currentVariant: {
				id: currentVariant.id,
				name: currentVariant.display_name,
				price: currentVariant.price,
				image:
					currentVariant.cover_image_url ||
					"/assets/image/placeholder-product.webp",
				photos:
					photos.length > 0
						? photos
						: ["/assets/image/placeholder-product.webp"],
			},
			otherVariants,
			specifications,
		};
	},

	formatPrice(price) {
		if (!price) return "Liên hệ";
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(price);
	},

	toSeoMeta(detail) {
		if (!detail || !detail.product) return {};
		const product = detail.product;
		const variant = detail.currentVariant;
		const name = product.metaTitle || product.name || "Chi tiết sản phẩm";
		const title = variant?.name ? `${name} - ${variant.name}` : name;
		const description =
			product.metaDescription ||
			product.shortDescription ||
			product.description ||
			"Thông tin chi tiết sản phẩm tại AnhEm Motor.";

		return {
			title: `${title} | AnhEm Motor`,
			ogTitle: `${title} | AnhEm Motor`,
			description,
			ogDescription: description,
			ogImage: variant?.image || "/assets/image/index/index-banner-bg.webp",
			twitterTitle: `${title} | AnhEm Motor`,
			twitterDescription: description,
			twitterImage:
				variant?.image || "/assets/image/index/index-banner-bg.webp",
		};
	},

	toCartItem(detail) {
		if (!detail || !detail.product || !detail.currentVariant) return null;
		const product = detail.product;
		const variant = detail.currentVariant;
		return {
			id: variant.id,
			name: product.name + (variant.name ? ` - ${variant.name}` : ""),
			price: variant.price,
			image: variant.image,
		};
	},
};

export default productMapper;
