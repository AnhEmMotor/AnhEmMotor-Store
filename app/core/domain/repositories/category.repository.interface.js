/**
 * Category Repository Interface (Domain Layer)
 * Contract for category data access operations.
 */
export const ICategoryRepository = {
  /**
   * Fetch categories with optional filters
   * @param {Object} params - Query parameters
   * @returns {Promise<any>}
   */
  getCategories: async (params) => {
    throw new Error('ICategoryRepository.getCategories not implemented');
  }
};
