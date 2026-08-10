export const useAssetUrl = (path) => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('/assets/')
  )
    return path;

  let config;
  try {
    config = useRuntimeConfig();
  } catch {
    config = { public: { apiUrlForBrowserClient: 'http://localhost:5000' } };
  }

  const baseUrl = config.public?.apiUrlForBrowserClient || 'http://localhost:5000';
  let cleanPath = path.replace(/\\/g, '/');
  cleanPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;

  if (cleanPath.startsWith('api/v1/MediaFile/view-image/')) {
    return `${baseUrl}/${cleanPath}`;
  }

  return `${baseUrl}/api/v1/MediaFile/view-image/${cleanPath}`;
};
