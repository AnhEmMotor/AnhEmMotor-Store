export const voucherRepository = {
  async getByCode(code) {
    const axios = useAxios();
    const response = await axios.get(`/api/v1/voucher/code/${code}`);
    return response.data?.data || response.data;
  },
  async validate(voucherId, outputId, orderTotal) {
    const axios = useAxios();
    const response = await axios.post('/api/v1/voucher/validate', {
      voucherId,
      outputId,
      orderTotal,
    });
    return response.data?.data || response.data;
  },
  async apply(voucherId, outputId) {
    const axios = useAxios();
    const response = await axios.post('/api/v1/voucher/apply', {
      voucherId,
      outputId,
    });
    return response.data?.data || response.data;
  },
  async remove(orderVoucherId) {
    const axios = useAxios();
    const response = await axios.delete(`/api/v1/voucher/apply/${orderVoucherId}`);
    return response.data?.data || response.data;
  },
};
