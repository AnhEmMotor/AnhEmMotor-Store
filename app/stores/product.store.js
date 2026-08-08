import { defineStore } from "pinia";
import { ref } from "vue";
import productService from "@/services/product.service";
import productMapper from "@/mappers/product.mapper";


export const useProductStore = defineStore("product", () => {
	const service = productService;

	const options = ref([]);
	const isLoadingOptions = ref(false);
	const optionsError = ref(null);

	const fetchOptions = async () => {
		isLoadingOptions.value = true;
		optionsError.value = null;
		try {
			const res = await service.getOptions();
			options.value = productMapper.mapOptions(res);
		} catch (error) {
			optionsError.value = error.message || "An error occurred";
		} finally {
			isLoadingOptions.value = false;
		}
	};

	const getOptions = async () => {
		const res = await service.getOptions();
		return productMapper.mapOptions(res);
	};

	const getProducts = async (params) => {
		const nuxtApp = useNuxtApp();
		const res = await service.getProducts(params);
		return nuxtApp.runWithContext(() => ({
			...res,
			items: productMapper.mapProductList(res.items),
		}));
	};

	const getRecommendations = async (params) => {
		const nuxtApp = useNuxtApp();
		const res = await service.getRecommendations(params);
		return nuxtApp.runWithContext(() => ({
			...res,
			items: productMapper.mapProductList(res.items),
		}));
	};

	const trackView = (productId, dwellTimeMs, visitorKey) =>
		service.trackView(productId, dwellTimeMs, visitorKey);

	const getBrands = async (params) => {
		const res = await service.getBrands(params);
		return res;
	};

	const getProductStoreDetailBySlug = async (slug, attributeLabels = null) => {
		const nuxtApp = useNuxtApp();
		const res = await service.getProductDetail(slug);
		return nuxtApp.runWithContext(() => productMapper.mapProductDetail(res, attributeLabels));
	};

	const getProductAttributeLabels = async () => {
		return await service.getAttributeLabels();
	};

	const attributeLabels = ref(null);
	const fetchAttributeLabels = async () => {
		if (attributeLabels.value) return attributeLabels.value;
		attributeLabels.value = await getProductAttributeLabels();
		return attributeLabels.value;
	};

	const fetchFullProductDetail = async (slug) => {
		const nuxtApp = useNuxtApp();
		const [labels, res] = await Promise.all([
			fetchAttributeLabels(),
			service.getProductDetail(slug),
		]);
		return nuxtApp.runWithContext(() => productMapper.mapProductDetail(res, labels));
	};

	return {
		options,
		isLoadingOptions,
		optionsError,
		fetchOptions,
		getOptions,
		getProducts,
		getRecommendations,
		trackView,
		getBrands,
		getProductStoreDetailBySlug,
		getProductAttributeLabels,
		fetchFullProductDetail,
	};
});
