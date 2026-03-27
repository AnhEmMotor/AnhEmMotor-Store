const productMapper = {
	mapProductList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapProductItem(item));
	},

	mapProductItem(raw) {
		return {
			id: raw.id,
			name: raw.name,
			slug: raw.variants?.[0]?.url || "",
			price: raw.variants?.[0]?.price || 0,
			image:
				raw.variants?.[0]?.image || "/assets/image/placeholder-product.webp",
			category: raw.category?.name || "",
			type: raw.type || "",
			variants: raw.variants || [],
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

		// Handle photos collection
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

		// Handle specifications
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
};

export default productMapper;
