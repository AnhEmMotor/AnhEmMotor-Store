export const resolveContactCategory = (contactData) => {
  const explicitCategory = contactData.category?.trim();
  if (explicitCategory) return explicitCategory;

  const subject = (contactData.subject || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase();

  if (
    ["bao duong", "sua chua", "ky thuat"].some((term) => subject.includes(term))
  ) {
    return "Service";
  }

  if (
    ["phan anh", "khieu nai", "bao hanh"].some((term) => subject.includes(term))
  ) {
    return "AfterSales";
  }

  return "Sales";
};

export const contactRepository = {
  async submitContact(contactData) {
    const axios = useAxios();
    const payload = {
      request: {
        fullName: contactData.fullName,
        phoneNumber: contactData.phone,
        email: contactData.email,
        subject: contactData.subject,
        category: resolveContactCategory(contactData),
        content: contactData.message,
      },
    };
    const response = await axios.post(
      "/api/v1/Contacts/support-request",
      payload,
    );
    return {
      success: true,
      id: response.data,
      message: "Gửi yêu cầu hỗ trợ thành công.",
    };
  },
};
