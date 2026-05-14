export class User {
	constructor(data = {}) {
		this.id = data.id || null;
		this.fullName = data.fullName || "";
		this.email = data.email || "";
		this.phoneNumber = data.phoneNumber || "";
		this.avatar = data.avatar || "/assets/image/default-avatar.png";
	}
}
