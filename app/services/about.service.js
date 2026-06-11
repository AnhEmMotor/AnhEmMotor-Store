


export const aboutService = {
	
	getAboutContent: async () => {
		
			const data = await aboutRepository.getAboutContent();
			return new AboutContent(data);
		
	},

	
	getLocations: async () => {
		
			const data = await aboutRepository.getLocations();
			return data.map(item => new StoreLocation(item));
		
	},
};
