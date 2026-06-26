/**
 * Product Repository Interface (Domain Layer)
 * Contract for product data access operations.
 */
export const IProductRepository = {
  /**
   * Fetch paginated products
   * @param {Object} params - Query parameters
   * @returns {Promise<{items: any[], totalCount: number, totalPages: number}>}
   */
  getProducts: async () => {
    throw new Error('IProductRepository.getProducts not implemented');
  },

  /**
   * Get product detail by slug
   * @param {string} slug
   * @returns {Promise<any>}
   */
  getProductDetail: async () => {
    throw new Error('IProductRepository.getProductDetail not implemented');
  },

  /**
   * Get product options (variants, attributes)
   * @returns {Promise<any>}
   */
  getOptions: async () => {
    throw new Error('IProductRepository.getOptions not implemented');
  },

  /**
   * Get product attribute labels for UI
   * @returns {Promise<any>}
   */
  getAttributeLabels: async () => {
    throw new Error('IProductRepository.getAttributeLabels not implemented');
  }
};
