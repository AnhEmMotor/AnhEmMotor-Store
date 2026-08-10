export const useCommentService = () => {
  const api = useAxios();

  const getComments = async (articleType, articleSlug) => {
    let url = '/api/v1/news-comments/public?';
    if (articleType) url += `articleType=${articleType}&`;
    if (articleSlug) url += `articleSlug=${articleSlug}`;

    const response = await api.get(url);
    return response?.data || response;
  };

  const createComment = async (data) => {
    const response = await api.post('/api/v1/news-comments/public', data);
    return response?.data || response;
  };

  return {
    getComments,
    createComment,
  };
};
