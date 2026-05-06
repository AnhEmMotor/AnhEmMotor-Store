import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompareStore = defineStore("compare", () => {
	const products = ref([]);

	const addProduct = (product) => {
		if (products.value.length >= 3) {
			return;
		}
		if (!products.value.find((p) => p.id === product.id)) {
			products.value.push(product);
		}
	};

	const removeProduct = (productId) => {
		products.value = products.value.filter((p) => p.id !== productId);
	};

	const clearAll = () => {
		products.value = [];
	};

	return {
		products,
		addProduct,
		removeProduct,
		clearAll,
	};
});
