export const voucherService = {
  async getByCode(code) {
    const trimmed = String(code || '')
      .trim()
      .toUpperCase();
    if (!trimmed) return null;
    try {
      const data = await voucherRepository.getByCode(trimmed);
      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('voucherService.getByCode', { error: e.message });
      return null;
    }
  },

  async validate(voucherId, outputId, orderTotal) {
    try {
      const result = await voucherRepository.validate(voucherId, outputId, orderTotal);
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('voucherService.validate', { error: e.message, voucherId, outputId });
      return { isValid: false, message: e?.message || 'Voucher không hợp lệ' };
    }
  },

  async apply(voucherId, outputId) {
    try {
      const data = await voucherRepository.apply(voucherId, outputId);
      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('voucherService.apply', { error: e.message, voucherId, outputId });
      return null;
    }
  },

  async remove(orderVoucherId) {
    try {
      const data = await voucherRepository.remove(orderVoucherId);
      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('voucherService.remove', { error: e.message, orderVoucherId });
      return null;
    }
  },
};

export default voucherService;
