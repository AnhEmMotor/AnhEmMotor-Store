export const contactRepository = {
	async submitContact(contactData) {
		const axios = useAxios();
		const payload = toSupportRequestPayload(contactData);
		const response = await axios.post("/api/v1/Contacts/support-request", { request: payload });

		return {
			success: true,
			id: response.data,
			message: "Gửi yêu cầu hỗ trợ thành công.",
		};
	}
};

const supportCategoryBySubject = {
	"Tu van mua xe": "Sales",
	"Tư vấn mua xe": "Sales",
	"Dich vu bao duong": "Service",
	"Dịch vụ bảo dưỡng": "Service",
	"Phu tung phu kien": "AfterSales",
	"Phụ tùng phụ kiện": "AfterSales",
	"Phan anh dich vu": "Quality",
	"Phản ánh dịch vụ": "Quality",
	"Khac": "Other",
	"Khác": "Other",
};

const toSupportRequestPayload = (contactData = {}) => {
	const subject = contactData.subject?.trim() || "";

	return {
		fullName: contactData.fullName?.trim() || "",
		phoneNumber: (contactData.phoneNumber || contactData.phone || "").trim(),
		email: contactData.email?.trim() || "",
		subject,
		category: supportCategoryBySubject[subject] || "General",
		content: (contactData.content || contactData.message || "").trim(),
	};
};
