import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "@/composables/useAxios";
import productService from "@/services/productService";
import productMapper from "@/mappers/productMapper";

export const useProductStore = defineStore("product", () => {
	const axios = useAxios();
	const service = productService(axios);

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
		const res = await service.getProducts(params);
		return {
			...res,
			items: productMapper.mapProductList(res.items),
		};
	};

	const getProductStoreDetailBySlug = async (slug, attributeLabels = null) => {
		const res = await service.getProductDetail(slug);
		return productMapper.mapProductDetail(res, attributeLabels);
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
		const labels = await fetchAttributeLabels();
		return await getProductStoreDetailBySlug(slug, labels);
	};

	return {
		options,
		isLoadingOptions,
		optionsError,
		fetchOptions,
		getOptions,
		getProducts,
		getProductStoreDetailBySlug,
		getProductAttributeLabels,
		fetchFullProductDetail,
	};
});
