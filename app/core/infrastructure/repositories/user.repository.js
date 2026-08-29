export const userRepository = {
  async getUserProfile() {
    const axios = useAxios();
    const response = await axios.get('/api/v1/User/me');
    return response.data;
  },

  async updateProfile(profileData) {
    const axios = useAxios();
    const response = await axios.put('/api/v1/User/me', profileData);
    return response.data;
  },

  async changePassword(passwordData) {
    const axios = useAxios();
    const response = await axios.post('/api/v1/User/change-password', passwordData);
    return response.data;
  },

  async updateAvatar(avatarData) {
    const axios = useAxios();
    const response = await axios.post('/api/v1/User/avatar', avatarData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
