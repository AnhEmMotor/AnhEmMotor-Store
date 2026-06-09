/**
 * Application Layer - App Service
 */
export const appService = {
	getAppContent: async () => {
		try {
			const data = await appRepository.getAppContent();
			return new AppContent(data);
		} catch (error) {
			console.error("Error in appService.getAppContent:", error);
			throw error;
		}
	}
};
