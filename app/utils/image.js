export const getImageUrl = (path) => {
	if (!path) return "/assets/image/placeholder-product.webp";

	if (typeof path === "string" && path.includes(",")) {
		path = path.split(",")[0].trim();
	}

	if (path.startsWith("http") || path.startsWith("data:")) return path;

	if (
		typeof path === "string" &&
		path.startsWith("/") &&
		!path.startsWith("/uploads") &&
		!path.startsWith("/api")
	) {
		return path;
	}

	const config = useRuntimeConfig();
	const baseURL = config.public.apiUrlForBrowserClient || "";

	// Remove leading slash if exists to avoid double slashes
	const cleanPath = path.startsWith("/") ? path.substring(1) : path;
	
	// If path already contains the view-image route (e.g., from backend), just use it directly
	if (cleanPath.startsWith("api/v1/MediaFile/view-image/")) {
		return `${baseURL}/${cleanPath}`;
	}
	
	return `${baseURL}/api/v1/MediaFile/view-image/${cleanPath}`;
};

export const getBrandLogo = (brandName) => {
	if (!brandName) return "/assets/image/placeholder-product.webp";
	
	const name = brandName.toLowerCase();
	
	if (name.includes("honda")) return "/assets/image/index/brand/honda.webp";
	if (name.includes("yamaha")) return "/assets/image/index/brand/yamaha.webp";
	if (name.includes("suzuki")) return "/assets/image/index/brand/suzuki.webp";
	if (name.includes("kawasaki")) return "/assets/image/index/brand/kawasaki.webp";
	if (name.includes("vinfast")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Logo_of_VinFast_%283D%29.svg/3840px-Logo_of_VinFast_%283D%29.svg.png";
	if (name.includes("piaggio")) return "https://inviva.vn/wp-content/uploads/2026/04/logo-piaggio-vector-06.png";
	if (name.includes("sym")) return "https://icon2.cleanpng.com/20180506/irw/avsqu6kzz.webp";
	if (name.includes("ducati")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ducati_red_logo.svg/1920px-Ducati_red_logo.svg.png";

	return "/assets/image/placeholder-product.webp";
};
