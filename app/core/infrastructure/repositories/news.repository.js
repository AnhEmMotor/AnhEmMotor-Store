/**
 * Infrastructure Layer - News Repository
 */
export const newsRepository = {
	async getNews(params) {
		const axios = useAxios();
		const response = await axios.get("/api/v1/News", { params });
		return response.data;
	},

	async getNewsDetail(slug) {
		const axios = useAxios();
		const response = await axios.get(`/api/v1/News/${slug}`);
		return response.data;
	},
};
