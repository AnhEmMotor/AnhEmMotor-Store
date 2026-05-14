

/**
 * Application Layer - About Service
 * Orchestrates business logic and data flow between UI and Infrastructure
 */
export const aboutService = {
	/**
	 * Gets formatted about content
	 * @returns {Promise<AboutContent>}
	 */
	getAboutContent: async () => {
		try {
			const data = await aboutRepository.getAboutContent();
			return new AboutContent(data);
		} catch (error) {
			console.error("Error in aboutService.getAboutContent:", error);
			throw error;
		}
	},

	/**
	 * Gets formatted store locations
	 * @returns {Promise<StoreLocation[]>}
	 */
	getLocations: async () => {
		try {
			const data = await aboutRepository.getLocations();
			return data.map(item => new StoreLocation(item));
		} catch (error) {
			console.error("Error in aboutService.getLocations:", error);
			throw error;
		}
	},
};
