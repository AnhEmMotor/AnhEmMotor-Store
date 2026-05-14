export const userRepository = {
	async getProfile() {
		const axios = useAxios();
		const response = await axios.get("/api/v1/User/profile");
		return response.data;
	},
	async updateProfile(profileData) {
		const axios = useAxios();
		const response = await axios.put("/api/v1/User/profile", profileData);
		return response.data;
	}
};
