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
      paymentMethod: this.normalizePaymentMethod(paymentMethod),
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
      totalAmount: raw.totalAmount || raw.total_amount || raw.total || raw.totalPrice || raw.amount || 0,
      status: raw.status || raw.status_id || raw.statusId || raw.orderStatus,
      statusId: raw.statusId || raw.status_id || raw.status || raw.orderStatus,
      paymentMethod: raw.paymentMethod || "COD",
      paymentStatus: raw.paymentStatus || raw.payment_status || null,
      paymentUrl: raw.paymentUrl || null,
      createdAt: raw.createdAt || raw.created_at || raw.creationTime || raw.orderDate || raw.date,
      customer: {
        name: raw.customerName || raw.customer_name,
        phone: raw.customerPhone || raw.customer_phone,
        address: raw.customerAddress || raw.customer_address,
      },
      items: (raw.outputInfos || raw.products || raw.items || []).map((item) => ({
        id: item.id,
        productVariantId: item.productVariantId,
        productVariantColorId: item.productVariantColorId,
        productVariantName: item.productVariantName || item.variantName,
        colorName: item.colorName,
        name: item.productName || item.name,
        quantity: item.count || item.quantity,
        price: item.price,
        image: item.coverImageUrl || item.image,
      })),
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
        const name = item.status_name || item.statusName || item.name || item.label;
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
    return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  },

  calculateSummary(cartDetails) {
    const subtotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 10000000 ? 0 : 200000;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  },
};

export default orderMapper;
