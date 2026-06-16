/**
 * User Repository Interface (Domain Layer)
 */
export const IUserRepository = {
  getUserProfile: async () => {
    throw new Error('IUserRepository.getUserProfile not implemented');
  },
  updateProfile: async (profileData) => {
    throw new Error('IUserRepository.updateProfile not implemented');
  },
  changePassword: async (passwordData) => {
    throw new Error('IUserRepository.changePassword not implemented');
  },
  updateAvatar: async (avatarData) => {
    throw new Error('IUserRepository.updateAvatar not implemented');
  }
};
