


const layoutService = {
	async getNavItems() {
		try {
			return await layoutRepository.getNavItems();
		} catch {

			return [];
		}
	},

	async getFooterData() {
		try {
			return await layoutRepository.getFooterData();
		} catch {

			return null;
		}
	},
};

export default layoutService;
