/**
 * News Repository Interface (Domain Layer)
 */
export const INewsRepository = {
  getNews: async (params) => {
    throw new Error('INewsRepository.getNews not implemented');
  },
  getNewsDetail: async (slug) => {
    throw new Error('INewsRepository.getNewsDetail not implemented');
  }
};
