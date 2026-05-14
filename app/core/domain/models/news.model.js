/**
 * Entity for News
 */
export class News {
	constructor(data = {}) {
		this.id = data.id || null;
		this.title = data.title || "";
		this.slug = data.slug || "";
		this.thumbnail = data.thumbnail || "/assets/image/placeholder-news.webp";
		this.content = data.content || "";
		this.shortContent = data.shortContent || "";
		this.category = data.category || "";
		this.createdAt = data.createdAt || new Date();
		this.author = data.author || "AnhEm Motor";
		this.views = data.views || 0;
		this.isFeatured = !!data.isFeatured;
	}

	get formattedDate() {
		return new Date(this.createdAt).toLocaleDateString('vi-VN');
	}
}
