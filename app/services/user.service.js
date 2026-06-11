


export const userService = {
	async getProfile() {
		try {
			return await userRepository.getProfile();
		} catch {

			return null;
		}
	},

	async updateProfile(profileData) {
		return await userRepository.updateProfile(profileData);
	},
};

export default userService;
