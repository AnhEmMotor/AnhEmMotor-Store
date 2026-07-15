const orderMapper = {
	normalizePaymentMethod(method) {
		const map = {
			cod: "COD",
			vnpay: "VNPay",
			payos: "PayOS",
		};
		return map[String(method || "cod").toLowerCase()] || "COD";
	},

	mapOrderPayload(shippingInfo, cartItems, userId, paymentMethod = "cod") {
		return {
			buyerId: userId,
			notes: shippingInfo.notes,
			customerName: shippingInfo.fullName,
			customerAddress: shippingInfo.address,
			customerPhone: shippingInfo.phone,
			provinceId: shippingInfo.provinceId,
			wardCode: shippingInfo.wardCode,
			paymentMethod: this.normalizePaymentMethod(paymentMethod),
			isCompanyInvoice: shippingInfo.isCompanyInvoice || false,
			companyName: shippingInfo.isCompanyInvoice ? shippingInfo.companyName : null,
			companyAddress: shippingInfo.isCompanyInvoice ? shippingInfo.companyAddress : null,
			companyTaxCode: shippingInfo.isCompanyInvoice ? shippingInfo.companyTaxCode : null,
			companyEmail: shippingInfo.isCompanyInvoice ? (shippingInfo.companyEmail || null) : null,
			budgetCode: shippingInfo.isCompanyInvoice ? (shippingInfo.budgetCode || null) : null,
			products: cartItems.map((item) => ({
				productVariantId: item.productVariantId ?? item.variantId,
				productVariantColorId:
					item.productVariantColorId && item.productVariantColorId > 0
						? item.productVariantColorId
						: null,
				count: item.quantity,
			})),
		};
	},

	mapOrderResponse(raw) {
		if (!raw) return null;
		return {
			id: raw.id || raw.Id,
			orderCode: raw.orderCode || raw.id,
			totalAmount:
				raw.totalAmount ||
				raw.total_amount ||
				raw.total ||
				raw.totalPrice ||
				raw.amount ||
				0,
			shippingFee: raw.shippingFee || raw.shipping_fee || 0,
			depositRatio: raw.depositRatio || raw.deposit_ratio || null,
			depositAmount: raw.depositAmount || raw.deposit_amount || null,
			remainingAmount: raw.remainingAmount || raw.remaining_amount || null,
			status: raw.status || raw.status_id || raw.statusId || raw.orderStatus,
			statusId: raw.statusId || raw.status_id || raw.status || raw.orderStatus,
			paymentMethod: raw.paymentMethod || "COD",
			paymentStatus: raw.paymentStatus || raw.payment_status || null,
			paymentUrl: raw.paymentUrl || null,
			notes: raw.notes || raw.Notes || null,
			createdAt:
				raw.createdAt ||
				raw.created_at ||
				raw.creationTime ||
				raw.orderDate ||
				raw.date,
			customer: {
				name: raw.customerName || raw.customer_name,
				phone: raw.customerPhone || raw.customer_phone,
				address: raw.customerAddress || raw.customer_address,
				provinceId: raw.provinceId || raw.ProvinceId || null,
				provinceName: raw.provinceName || raw.ProvinceName || null,
				wardCode: raw.wardCode || raw.WardCode || null,
				wardName: raw.wardName || raw.WardName || null,
			},
			isCompanyInvoice: raw.isCompanyInvoice || raw.IsCompanyInvoice || false,
			companyName: raw.companyName || raw.CompanyName || null,
			companyAddress: raw.companyAddress || raw.CompanyAddress || null,
			companyTaxCode: raw.companyTaxCode || raw.CompanyTaxCode || null,
			companyEmail: raw.companyEmail || raw.CompanyEmail || null,
			budgetCode: raw.budgetCode || raw.BudgetCode || null,
			items: (raw.outputInfos || raw.products || raw.items || []).map(
				(item) => ({
					id: item.id,
					productVariantId: item.productVariantId,
					productVariantColorId: item.productVariantColorId,
					productVariantName: item.productVariantName || item.variantName,
					colorName: item.colorName,
					name: item.productName || item.name,
					quantity: item.count || item.quantity,
					price: item.price,
					image: item.coverImageUrl || item.image,
				}),
			),
		};
	},

	mapOrderList(raw) {
		const items = raw.Items || raw.items || [];
		return items.map((item) => this.mapOrderResponse(item));
	},

	mapStatusMap(raw) {
		if (!raw) return {};
		if (Array.isArray(raw)) {
			return raw.reduce((acc, item) => {
				const id = item.status_id || item.statusId || item.id || item.value;
				const name =
					item.status_name || item.statusName || item.name || item.label;
				if (id !== undefined) acc[id] = name;
				return acc;
			}, {});
		}
		return raw;
	},

	mapLockedStatuses(raw) {
		if (!raw) return { deliveryInfo: [], notes: [] };
		return {
			deliveryInfo: raw.delivery_info || [],
			notes: raw.notes || [],
		};
	},

	formatPrice(value) {
		if (!value) return "0 ₫";
		return value.toLocaleString("vi-VN", {
			style: "currency",
			currency: "VND",
		});
	},

	calculateSummary(cartDetails, depositSettings = {}) {
		const subtotal = cartDetails.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
		const shipping = subtotal > 10000000 ? 0 : 200000;
		const total = subtotal + shipping;
		const orderValueExceeds = Number(depositSettings.orderValueExceeds || 0);
		const depositRatio = Number(depositSettings.depositRatio || 0);
		const requiresDeposit =
			orderValueExceeds > 0 &&
			depositRatio > 0 &&
			subtotal >= orderValueExceeds;
		const depositAmount = requiresDeposit
			? Math.round((total * depositRatio) / 100)
			: 0;
		const remainingAmount = requiresDeposit
			? Math.max(total - depositAmount, 0)
			: 0;
		const payableNow = requiresDeposit ? depositAmount : total;
		return {
			subtotal,
			shipping,
			total,
			requiresDeposit,
			depositRatio,
			depositAmount,
			remainingAmount,
			payableNow,
		};
	},
};

export default orderMapper;

