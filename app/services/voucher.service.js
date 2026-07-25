export const voucherService = {
  async getByCode(code) {
    const trimmed = String(code || "").trim().toUpperCase();
    if (!trimmed) return null;
    try {
      const data = await voucherRepository.getByCode(trimmed);
      return data;
    } catch (e) {
      console.error("Voucher lookup failed:", e);
      return null;
    }
  },

  async validate(voucherId, outputId) {
    try {
      const data = await voucherRepository.validate(voucherId, outputId);
      return data;
    } catch (e) {
      console.error("Voucher validate failed:", e);
      return { isValid: false, message: e?.message || "Voucher không hợp lệ" };
    }
  },

  async apply(voucherId, outputId) {
    try {
      const data = await voucherRepository.apply(voucherId, outputId);
      return data;
    } catch (e) {
      console.error("Voucher apply failed:", e);
      return null;
    }
  },

  async remove(orderVoucherId) {
    try {
      const data = await voucherRepository.remove(orderVoucherId);
      return data;
    } catch (e) {
      console.error("Voucher remove failed:", e);
      return null;
    }
  },
};

export default voucherService;
