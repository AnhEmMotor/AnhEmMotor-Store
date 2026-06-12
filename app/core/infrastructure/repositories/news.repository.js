import { NEWS_ENDPOINTS } from "../../../constants/endpoints/news.endpoint";


export const newsRepository = {
	async getNewsCategories() {
		const axios = useAxios();
		const response = await axios.get(NEWS_ENDPOINTS.CATEGORIES);
		return response.data;
	},

	async getNews(params = {}) {
		const axios = useAxios();
		const response = await axios.get(NEWS_ENDPOINTS.PUBLIC_LIST, { params });
		return response.data;
	},

	async getNewsDetail(slug) {
		const axios = useAxios();
		const response = await axios.get(`${NEWS_ENDPOINTS.DETAIL}/${slug}`);
		return response.data;
	},

	async getLatestNews() {
		const axios = useAxios();
		const response = await axios.get(NEWS_ENDPOINTS.LATEST_PUBLIC);
		return response.data;
	},

	async getFeaturedNews() {
		const axios = useAxios();
		const response = await axios.get(NEWS_ENDPOINTS.PUBLIC_LIST, { params: { pageSize: 3, isFeatured: true, sorts: "-createdAt" } });
		return response.data;
	}
};
