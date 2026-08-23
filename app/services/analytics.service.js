export default (axios) => ({
  async getPublicConfig() {
    const response = await axios.get('/api/v1/analytics/public-config');
    return response.data;
  },
});
