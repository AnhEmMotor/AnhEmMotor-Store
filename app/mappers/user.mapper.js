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

	genderOptions: [
		{ value: "Male", label: "Nam" },
		{ value: "Female", label: "Nữ" },
		{ value: "Other", label: "Khác" },
	],
};
