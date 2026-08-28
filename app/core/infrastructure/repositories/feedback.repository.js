export const feedbackRepository = {
  async getMine() {
    const axios = useAxios();
    const response = await axios.get('/api/v1/client/support/my-feedbacks');
    return response.data || [];
  },

  async submitFeedback(payload) {
    const axios = useAxios();
    const response = await axios.post('/api/v1/Contacts/feedback', {
      request: payload,
    });

    return {
      success: true,
      id: response.data,
      message: 'Gửi góp ý thành công.',
    };
  },
};
