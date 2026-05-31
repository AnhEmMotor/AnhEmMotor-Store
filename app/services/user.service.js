

/**
 * Application Layer - User Service
 */
export const userService = {
	async getProfile() {
		try {
			return await userRepository.getProfile();
		} catch (error) {
			console.error("Service: Failed to fetch user profile:", error);
			return null;
		}
	},

	async updateProfile(profileData) {
		try {
			return await userRepository.updateProfile(profileData);
		} catch (error) {
			console.error("Service: Failed to update user profile:", error);
			throw error;
		}
	},
};

export default userService;
