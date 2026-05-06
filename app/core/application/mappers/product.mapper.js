

const productMapper = {
	mapProductList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapProductItem(item));
	},

	mapProductItem(raw) {
		const variants = (raw.variants || []).map((v) => ({
			...v,
			image: getImageUrl(v.image || v.cover_image_url),
			cover_image_url: getImageUrl(v.cover_image_url || v.image),
		}));

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
			category: raw.categoryName || raw.category?.name || "",
			brand: raw.brand || "",
			type: raw.type || "",
			rating: raw.rating || 5,
			reviews: raw.reviewsCount || 0,
			inventoryStatus: raw.inventoryStatus,
			variants: variants,
		};
	},


	mapOptions(rawOptions) {
		if (!rawOptions || !Array.isArray(rawOptions)) return [];
		
		const grouped = {};
		
		rawOptions.forEach(option => {
			if (!grouped[option.name]) {
				grouped[option.name] = {
					id: option.id,
					name: option.name,
					values: []
				};
			}
			
			if (option.values && Array.isArray(option.values)) {
				option.values.forEach(val => {
					const valName = val.value || val.name || "";
					// Deduplicate values by their name/value string to avoid repeated labels
					if (!grouped[option.name].values.find(v => v.name === valName)) {
						grouped[option.name].values.push({
							id: val.id,
							name: valName,
							code: val.colorCode || val.ColorCode || null
						});
					}
				});
			}
		});

		return Object.values(grouped);
	},

	mapProductDetail(raw, attributeLabels = null) {
		if (!raw || !raw.product) return null;
		const product = raw.product;
		const currentVariant = raw.current_variant || {};
		const otherVariants = (raw.other_variants || []).map((v) => ({
			slug: v.url_slug || v.slug,
			display_name: v.display_name,
			price: v.price,
			image: getImageUrl(v.cover_image_url || v.image),
		}));

		const photos = [];
		if (currentVariant.cover_image_url) {
			if (
				typeof currentVariant.cover_image_url === "string" &&
				currentVariant.cover_image_url.includes(",")
			) {
				const urls = currentVariant.cover_image_url
					.split(",")
					.map((u) => u.trim());
				photos.push(...urls.map((u) => getImageUrl(u)));
			} else {
				photos.push(getImageUrl(currentVariant.cover_image_url));
			}
		}

		if (currentVariant.photo_collection?.length > 0) {
			const otherPhotos = currentVariant.photo_collection
				.filter((p) => !photos.includes(getImageUrl(p)))
				.map((p) => getImageUrl(p));
			photos.push(...otherPhotos);
		}

		const defaultLabels = {
			Weight: 'Trọng lượng bản thân',
			weight: 'Trọng lượng bản thân',
			Dimensions: 'Kích thước (D x R x C)',
			dimensions: 'Kích thước (D x R x C)',
			Wheelbase: 'Khoảng cách trục bánh xe',
			wheelbase: 'Khoảng cách trục bánh xe',
			SeatHeight: 'Độ cao yên',
			seat_height: 'Độ cao yên',
			GroundClearance: 'Khoảng sáng gầm xe',
			ground_clearance: 'Khoảng sáng gầm xe',
			FuelCapacity: 'Dung tích bình xăng',
			fuel_capacity: 'Dung tích bình xăng',
			FuelConsumption: 'Mức tiêu thụ nhiên liệu',
			fuel_consumption: 'Mức tiêu thụ nhiên liệu',
			OilCapacity: 'Dung tích nhớt máy',
			oil_capacity: 'Dung tích nhớt máy',
			EngineType: 'Loại động cơ',
			engine_type: 'Loại động cơ',
			Displacement: 'Dung tích xy-lanh',
			displacement: 'Dung tích xy-lanh',
			BoreStroke: 'Đường kính x Hành trình piston',
			bore_stroke: 'Đường kính x Hành trình piston',
			CompressionRatio: 'Tỷ số nén',
			compression_ratio: 'Tỷ số nén',
			MaxPower: 'Công suất tối đa',
			max_power: 'Công suất tối đa',
			MaxTorque: 'Moment xoắn cực đại',
			max_torque: 'Moment xoắn cực đại',
			FuelSystem: 'Hệ thống cung cấp nhiên liệu',
			fuel_system: 'Hệ thống cung cấp nhiên liệu',
			TransmissionType: 'Loại truyền động',
			transmission_type: 'Loại truyền động',
			StarterSystem: 'Hệ thống khởi động',
			starter_system: 'Hệ thống khởi động',
			FrameType: 'Loại khung xe',
			frame_type: 'Loại khung xe',
			FrontSuspension: 'Phuộc trước',
			front_suspension: 'Phuộc trước',
			RearSuspension: 'Phuộc sau',
			rear_suspension: 'Phuộc sau',
			FrontTireSize: 'Kích cỡ lốp trước',
			front_tire_size: 'Kích cỡ lốp trước',
			RearTireSize: 'Kích cỡ lốp sau',
			rear_tire_size: 'Kích cỡ lốp sau',
			FrontBrake: 'Phanh trước',
			front_brake: 'Phanh trước',
			RearBrake: 'Phanh sau',
			rear_brake: 'Phanh sau',
			BatteryType: 'Loại ắc quy',
			battery_type: 'Loại ắc quy',
			LightingSystem: 'Hệ thống chiếu sáng',
			lighting_system: 'Hệ thống chiếu sáng',
			DashboardType: 'Đồng hồ hiển thị',
			dashboard_type: 'Đồng hồ hiển thị',
			TireSize: 'Kích cỡ lốp trước/sau',
			tire_size: 'Kích cỡ lốp trước/sau'
		};

		const labels = { ...defaultLabels, ...(attributeLabels || {}) };

		let specifications = [];
		if (product.specifications) {
			// Handle array of {key, label, value} or {Key, Label, Value}
			if (Array.isArray(product.specifications)) {
				specifications = product.specifications.map(s => ({
					key: s.key || s.Key || "",
					label: labels[s.key || s.Key] || s.label || s.Label || "",
					value: s.value || s.Value || ""
				}));
			} 
			// Handle flat object { weight: 122, ... }
			else {
				specifications = Object.entries(product.specifications)
					.filter(
						([key, value]) =>
							labels[key] &&
							value !== null &&
							value !== undefined &&
							value !== "",
					)
					.map(([key, value]) => ({
						key,
						label: labels[key],
						value: value,
					}));
			}
		}

		let highlights = [];
		if (product.highlights) {
			try {
				const rawHighlights = JSON.parse(product.highlights);
				highlights = rawHighlights.map((h) => ({
					...h,
					image: h.image ? getImageUrl(h.image) : null,
				}));
			} catch (e) {
				console.error("Failed to parse highlights", e);
			}
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
				highlights: highlights,
			},
			currentVariant: {
				id: currentVariant.id || currentVariant.Id,
				name: currentVariant.display_name,
				slug: currentVariant.url_slug,
				price: currentVariant.price || currentVariant.Price,
				// Handle multiple colors/images in a single variant
				colors: (currentVariant.color_name || "").split(",").filter(Boolean).map((name, index) => {
					const codes = (currentVariant.color_code || "").split(",");
					const images = (currentVariant.cover_image_url || "").split(",");
					return {
						name: name.trim(),
						code: (codes[index] || codes[0] || "#ccc").trim(),
						image: getImageUrl(images[index] || images[0] || currentVariant.cover_image_url)
					};
				}),
				photos: currentVariant.photo_collection?.map((url) =>
					getImageUrl(url),
				) || [getImageUrl(currentVariant.cover_image_url)],
			},
			otherVariants: raw.other_variants?.map((v) => ({
				id: v.id,
				name: v.display_name,
				slug: v.url_slug,
				price: v.price || v.Price,
				colors: (v.color_name || "").split(",").filter(Boolean).map((name, index) => {
					const codes = (v.color_code || "").split(",");
					const images = (v.cover_image_url || "").split(",");
					return {
						name: name.trim(),
						code: (codes[index] || codes[0] || "#ccc").trim(),
						image: getImageUrl(images[index] || images[0] || v.cover_image_url)
					};
				}),
			})),
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

	toCartItem(detail, colorIndex = 0) {
		if (!detail || !detail.product || !detail.currentVariant) return null;
		const product = detail.product;
		const variant = detail.currentVariant;
		const selectedColor = variant.colors?.[colorIndex];

		return {
			id: variant.id,
			name:
				product.name +
				(variant.name ? ` - ${variant.name}` : "") +
				(selectedColor ? ` - ${selectedColor.name}` : ""),
			price: variant.price,
			image: selectedColor?.image || variant.image,
		};
	},
};

export default productMapper;

