export const voucherRepository = {
  getByCode(code) {
    const axios = useAxios();
    const response = axios.get(`/api/v1/voucher/code/${code}`);
    return response;
  },
  validate(voucherId, outputId) {
    const axios = useAxios();
    const response = axios.post("/api/v1/voucher/validate", {
      voucherId,
      outputId,
    });
    return response;
  },
  apply(voucherId, outputId) {
    const axios = useAxios();
    const response = axios.post("/api/v1/voucher/apply", {
      voucherId,
      outputId,
    });
    return response;
  },
  remove(orderVoucherId) {
    const axios = useAxios();
    const response = axios.delete(`/api/v1/voucher/apply/${orderVoucherId}`);
    return response;
  },
};
