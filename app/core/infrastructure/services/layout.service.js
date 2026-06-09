

/**
 * Application Layer - Layout Service
 */
const layoutService = {
	async getNavItems() {
		try {
			return await layoutRepository.getNavItems();
		} catch (error) {
			console.error("Service: Failed to fetch nav items:", error);
			return [];
		}
	},

	async getFooterData() {
		try {
			return await layoutRepository.getFooterData();
		} catch (error) {
			console.error("Service: Failed to fetch footer data:", error);
			return null;
		}
	},
};

export default layoutService;
