import { IUserRepository } from "@/core/domain/repositories/user.repository.interface";

export const createUserService = (repository) => ({
	async getProfile() {
		try {
			return await repository.getUserProfile();
		} catch (error) {
			return null;
		}
	},

	async updateProfile(profileData) {
		try {
			return await repository.updateProfile(profileData);
		} catch (error) {
			throw error;
		}
	},

	async changePassword(passwordData) {
		try {
			return await repository.changePassword(passwordData);
		} catch (error) {
			throw error;
		}
	},

	async updateAvatar(avatarData) {
		try {
			return await repository.updateAvatar(avatarData);
		} catch (error) {
			throw error;
		}
	},
});

export default userService;
