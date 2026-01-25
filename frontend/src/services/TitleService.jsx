const BASE_URL = '/api/titles';

/**
   * Fetches global metadata constants from the backend.
   * @returns {Promise<{availableGenres: string[], availableTitleTypes: string[], availableModes: string[]}>}
   * @throws {Error} if the network request fails.
   */
export const TitlesService = {
  getSearchOptions: async () => {
    const response = await fetch(`${BASE_URL}/getSearchOptions`);
    if (!response.ok) throw new Error('Failed to fetch metadata');
    return await response.json();
  },


  /**
   * Searches for titles based on user-provided filters.
   * @param {string} mode - The search mode (sequential, gin, gin_mat)
   * @param {Object} params - The search criteria.
   * @param {string} params.title - The title string to look for.
   * @param {string} params.genre - The genre category.
   * @param {string} params.titletype - the type of title
   * @param {number} params.fromYear - start year
   * @param {number} params.toYear - to year
   * @param {string} params.lastId - cursor 
   * @param {number} params.limit - #returning rows
   * @returns {Promise<Array>} A list of movie/show results.
   */

  searchTitles: async (mode, params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/search?mode=${mode}&${queryString}`);
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  }
};