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
    // Fallback if useRuntimeConfig is called outside setup
    config = { public: { apiUrlForBrowserClient: 'http://localhost:5000' } };
  }

  const baseUrl = config.public?.apiUrlForBrowserClient || 'http://localhost:5000';
  let cleanPath = path.replace(/\\/g, '/');
  cleanPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;

  // If path already contains the view-image route (e.g., from backend), just use it directly
  if (cleanPath.startsWith('api/v1/MediaFile/view-image/')) {
    return `${baseUrl}/${cleanPath}`;
  }

  return `${baseUrl}/api/v1/MediaFile/view-image/${cleanPath}`;
};
