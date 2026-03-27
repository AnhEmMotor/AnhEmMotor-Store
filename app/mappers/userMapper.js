export const userMapper = {
	toUpdateProfilePayload(formData) {
		return {
			fullName: formData.fullName,
			phoneNumber: formData.phoneNumber,
			gender: formData.gender,
		};
	},

	toChangePasswordPayload(passwordData) {
		return {
			currentPassword: passwordData.currentPassword,
			newPassword: passwordData.newPassword,
		};
	},
};
