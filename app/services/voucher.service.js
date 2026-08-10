export const voucherService = {
  async getByCode(code) {
    const trimmed = String(code || '')
      .trim()
      .toUpperCase();
    if (!trimmed) return null;
    try {
      const data = await voucherRepository.getByCode(trimmed);
      return data;
    } catch {
      return null;
    }
  },

  async validate(voucherId, outputId, orderTotal) {
    try {
      const result = await voucherRepository.validate(voucherId, outputId, orderTotal);
      return result;
    } catch (e) {
      return { isValid: false, message: e?.message || 'Voucher không hợp lệ' };
    }
  },

  async apply(voucherId, outputId) {
    try {
      const data = await voucherRepository.apply(voucherId, outputId);
      return data;
    } catch {
      return null;
    }
  },

  async remove(orderVoucherId) {
    try {
      const data = await voucherRepository.remove(orderVoucherId);
      return data;
    } catch {
      return null;
    }
  },
};

export default voucherService;
