
import { userRepository } from '@/core/infrastructure/repositories/user.repository';

export const userService = {

	async getProfile() {
		try {
			return await userRepository.getUserProfile();
		} catch { return null; }
	},

	async updateProfile(profileData) {
		return await userRepository.updateProfile(profileData);
	},

	async changePassword(passwordData) {
		return await userRepository.changePassword(passwordData);
	},

	async updateAvatar(avatarData) {
		return await userRepository.updateAvatar(avatarData);
	},
};

export default userService;
