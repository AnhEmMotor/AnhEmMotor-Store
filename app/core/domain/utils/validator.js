export const validatePhone = (phone) => {
	const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
	return re.test(phone);
};
