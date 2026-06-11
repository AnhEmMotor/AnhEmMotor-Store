
export const appService = {
	getAppContent: async () => {
		
			const data = await appRepository.getAppContent();
			return new AppContent(data);
		
	}
};
