import { getImageUrl } from '~/utils/image';

const orderMapper = {
  normalizePaymentMethod(method) {
    const map = {
      cod: 'COD',
      vnpay: 'VNPay',
      payos: 'PayOS',
    };
    return map[String(method || 'cod').toLowerCase()] || 'COD';
  },

  mapOrderPayload(shippingInfo, cartItems, userId, paymentMethod = 'cod', voucherCode = null) {
    return {
      buyerId: userId,
      voucherCode: voucherCode,
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
      companyEmail: shippingInfo.isCompanyInvoice ? shippingInfo.companyEmail || null : null,
      budgetCode: shippingInfo.isCompanyInvoice ? shippingInfo.budgetCode || null : null,
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
        raw.totalAmount || raw.total_amount || raw.total || raw.totalPrice || raw.amount || 0,
      shippingFee: raw.shippingFee || raw.shipping_fee || 0,
      depositRatio: raw.depositRatio || raw.deposit_ratio || null,
      depositAmount: raw.depositAmount || raw.deposit_amount || null,
      remainingAmount: raw.remainingAmount || raw.remaining_amount || null,
      status: raw.status || raw.status_id || raw.statusId || raw.orderStatus,
      statusId: raw.statusId || raw.status_id || raw.status || raw.orderStatus,
      paymentMethod: raw.paymentMethod || 'COD',
      paymentStatus: raw.paymentStatus || raw.payment_status || null,
      paymentUrl: raw.paymentUrl || null,
      notes: raw.notes || raw.Notes || null,
      createdAt: raw.createdAt || raw.created_at || raw.creationTime || raw.orderDate || raw.date,
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
      items: (raw.outputInfos || raw.products || raw.items || []).map((item) => ({
        id: item.id,
        productVariantId: item.productVariantId,
        productVariantColorId: item.productVariantColorId,
        productVariantName: item.productVariantName || item.variantName,
        colorName: item.colorName,
        name: item.productName || item.name,
        quantity: item.count || item.quantity,
        price: item.price,
        image: getImageUrl(item.coverImageUrl || item.image),
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
    if (!value) return '0 ₫';
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  },

  calculateSummary(cartDetails, rawSettings = {}, calculatedShipping = null, discountAmount = 0) {
    const subtotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = calculatedShipping !== null ? calculatedShipping : null;
    const total = Math.max(0, subtotal + shipping - discountAmount);

    let hasVehicle = false;
    let hasPart = false;
    let hasAccessory = false;

    cartDetails.forEach((item) => {
      const catName = item.categoryName || '';
      if (item.managementType === 'vin_number' || catName.toLowerCase().includes('xe')) {
        hasVehicle = true;
      } else if (catName.toLowerCase().includes('phụ kiện')) {
        hasAccessory = true;
      } else {
        hasPart = true;
      }
    });

    let orderType = 'Xe máy';
    if (hasVehicle && (hasPart || hasAccessory)) {
      orderType = 'Phụ tùng & xe máy';
    } else if (hasVehicle) {
      orderType = 'Xe máy';
    } else if (hasPart) {
      orderType = 'Chỉ có phụ tùng';
    } else if (hasAccessory) {
      orderType = 'Chỉ có phụ kiện';
    }

    const getSetting = (key, defaultVal) => {
      const found = Object.keys(rawSettings || {}).find(
        (k) => k.toLowerCase() === key.toLowerCase()
      );
      return found ? rawSettings[found] : defaultVal;
    };

    const orderValueExceeds = Number(getSetting(`Deposit_${orderType}_Threshold`, 100000000));
    const depositRatio = Number(getSetting(`Deposit_${orderType}_Ratio`, 0));
    const depositType = 'percentage';
    const fixedDepositAmount = 0;

    const requiresDeposit = orderValueExceeds > 0 && total > orderValueExceeds;

    let depositAmount = 0;
    let displayRatio = depositRatio;

    if (requiresDeposit) {
      if (depositType === 'fixed') {
        let vehicleCount = 0;
        (cartDetails || []).forEach((item) => {
          if (item.managementType === 'vin_number') {
            vehicleCount += item.quantity;
          }
        });
        if (vehicleCount > 0) {
          depositAmount = fixedDepositAmount * vehicleCount;
          if (total > 0) {
            displayRatio = Math.round((depositAmount / total) * 100);
          } else {
            displayRatio = 0;
          }
        } else {
          depositAmount = 0;
          displayRatio = 0;
        }
      } else {
        depositAmount = Math.round((total * depositRatio) / 100);
      }
    }

    const remainingAmount = requiresDeposit ? Math.max(total - depositAmount, 0) : 0;
    const payableNow = requiresDeposit ? Math.max(0, depositAmount - discountAmount) : total;

    return {
      subtotal,
      shipping,
      total,
      requiresDeposit,
      depositType,
      depositRatio: displayRatio,
      fixedDepositAmount,
      depositAmount,
      remainingAmount,
      payableNow,
    };
  },
};

export default orderMapper;
