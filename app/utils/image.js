export const getImageUrl = (path) => {
	if (!path) return "/assets/image/placeholder-product.webp";
	
	// If the path contains multiple comma-separated URLs, take the first one
	if (typeof path === "string" && path.includes(",")) {
		path = path.split(",")[0].trim();
	}

	if (path.startsWith("http") || path.startsWith("data:")) return path;

	const config = useRuntimeConfig();
	const baseURL = config.public.apiUrlForBrowserClient || "";

	// Remove leading slash if exists to avoid double slashes
	const cleanPath = path.startsWith("/") ? path.substring(1) : path;
	return `${baseURL}/${cleanPath}`;
};


export const getBrandLogo = (brandName) => {
	const logos = {
		honda: "/assets/image/index/brand/honda.webp",
		yamaha: "/assets/image/index/brand/yamaha.webp",
		suzuki: "/assets/image/index/brand/suzuki.webp",
		kawasaki: "/assets/image/index/brand/kawasaki.webp",
	};
	return logos[brandName.toLowerCase()] || "/assets/image/placeholder-product.webp";
};
