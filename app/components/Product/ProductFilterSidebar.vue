<script setup>
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useAxios } from "@/composables/useAxios";
import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoint";

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue", "close"]);

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const axios = useAxios();

const {
	data: brandsData,
	isLoading: isLoadingBrands,
} = useQuery({
	queryKey: ["product-brands"],
	queryFn: async () => {
		const { data } = await axios.get(PRODUCT_ENDPOINTS.BRANDS);
		return data;
	},
	staleTime: 1000 * 60 * 60,
});

const brands = computed(() => {
	if (brandsData.value?.items) return brandsData.value.items;
	if (Array.isArray(brandsData.value)) return brandsData.value;
	return [];
});

const {
	data: categoriesData,
	isLoading: isLoadingCategories,
	error: categoriesError,
} = useQuery({
	queryKey: ["product-categories"],
	queryFn: () => categoryStore.getProductCategories(),
	staleTime: 1000 * 60 * 60,
});

const categories = computed(() => {
	if (categoriesData.value?.items) return categoriesData.value.items;
	if (Array.isArray(categoriesData.value)) return categoriesData.value;
	return [];
});

const {
	data: optionsData,
	isLoading: isLoadingOptions,
	error: optionsError,
	refetch: fetchOptionsManual,
} = useQuery({
	queryKey: ["product-options"],
	queryFn: () => productStore.getOptions(),
	staleTime: 1000 * 60 * 60,
});

const filteredOptions = computed(() => {
	const requested = ["VehicleType"];
	const allOptions = optionsData.value || [];
	return allOptions
		.filter((opt) => requested.includes(opt.name))
		.map(opt => opt)
		.sort((a, b) => requested.indexOf(a.name) - requested.indexOf(b.name));
});

const searchQuery = computed({
	get: () => props.modelValue.search || "",
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, search: val });
	},
});

const selectedOptions = computed({
	get: () => props.modelValue.optionValueIds || [],
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, optionValueIds: val });
	},
});

const selectedCategories = computed({
	get: () => props.modelValue.category_ids || [],
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, category_ids: val });
	},
});

const selectedBrands = computed({
	get: () => props.modelValue.brand_ids || [],
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, brand_ids: val });
	},
});

const minPrice = computed({
	get: () => props.modelValue.minPrice ?? 0,
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, minPrice: val });
	},
});

const maxPrice = computed({
	get: () => props.modelValue.maxPrice ?? 500000000,
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, maxPrice: val });
	},
});

const isCategorySelected = (catId) => selectedCategories.value.includes(catId);

const toggleCategory = (catId) => {
	const current = [...selectedCategories.value];
	const index = current.indexOf(catId);
	if (index > -1) {
		current.splice(index, 1);
	} else {
		current.push(catId);
	}
	selectedCategories.value = current;
};

const isBrandSelected = (brandId) => selectedBrands.value.includes(brandId);

const toggleBrand = (brandId) => {
	const current = [...selectedBrands.value];
	const index = current.indexOf(brandId);
	if (index > -1) {
		current.splice(index, 1);
	} else {
		current.push(brandId);
	}
	selectedBrands.value = current;
};

const isSelected = (val) => {
	if (val.ids) {
		return val.ids.some(id => selectedOptions.value.includes(id));
	}
	return selectedOptions.value.includes(val.id);
};

const toggleOption = (val) => {
	const current = [...selectedOptions.value];
	const ids = val.ids || [val.id];
	
	const isAlreadySelected = isSelected(val);
	
	if (isAlreadySelected) {
		// Remove all IDs in this group
		ids.forEach(id => {
			const index = current.indexOf(id);
			if (index > -1) current.splice(index, 1);
		});
	} else {
		// Add all IDs in this group that aren't already there
		ids.forEach(id => {
			if (!current.includes(id)) current.push(id);
		});
	}
	selectedOptions.value = current;
};

const resetFilters = () => {
	emit("update:modelValue", {
		search: "",
		optionValueIds: [],
		category_ids: [],
		brand_ids: [],
		minPrice: null,
		maxPrice: null,
	});
};

const optionLabels = {
	Brand: "Thương Hiệu",
	VehicleType: "Loại Xe",
};

const getOptionLabel = (name) => optionLabels[name] || name;

const formatVND = (val) => {
	if (!val) return "0đ";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		maximumFractionDigits: 0,
	}).format(val);
};
</script>

<template>
	<div class="flex flex-col h-full bg-white">
		<div class="p-6 border-b border-gray-100 flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
				<Icon name="fa6-solid:sliders" class="text-primary" />
				Bộ lọc
			</h2>
			<button
				class="lg:hidden text-gray-400 hover:text-gray-600"
				aria-label="Đóng cửa sổ bộ lọc"
				@click="emit('close')"
			>
				<Icon name="fa6-solid:xmark" class="text-xl" />
			</button>
		</div>

		<div class="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
			<!-- Marketing / Suggestions Section -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(227,24,55,0.5)]"></div>
					<label class="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
						<Icon name="fa6-solid:fire" class="animate-pulse" />
						Gợi ý hôm nay
					</label>
				</div>
				<div class="grid grid-cols-1 gap-3">
					<button 
						class="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1 group"
						@click="searchQuery = 'hot'"
					>
						<div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
							<Icon name="fa6-solid:crown" class="text-yellow-500" />
						</div>
						<div class="text-left">
							<p class="text-xs font-black text-gray-900 uppercase">Bán chạy nhất</p>
							<p class="text-[10px] font-bold text-red-500">Ưu đãi lên tới 10%</p>
						</div>
					</button>

					<button 
						class="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1 group"
						@click="searchQuery = 'new'"
					>
						<div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
							<Icon name="fa6-solid:wand-magic-sparkles" class="text-blue-500" />
						</div>
						<div class="text-left">
							<p class="text-xs font-black text-gray-900 uppercase">Xe mới về</p>
							<p class="text-[10px] font-bold text-blue-500">Hỗ trợ trả góp 0%</p>
						</div>
					</button>
				</div>
			</div>

			<!-- Categories -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"></div>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest"
						>Danh mục</label
					>
				</div>
				<ClientOnly>
					<div v-if="isLoadingCategories" class="py-4 flex justify-center">
						<div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
					</div>
					<div v-else-if="categories.length > 0" class="grid grid-cols-1 gap-2">
						<button
							v-for="cat in categories"
							:key="cat.id"
							class="group flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl border transition-all duration-300"
							:class="[
								isCategorySelected(cat.id)
									? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 translate-x-2'
									: 'bg-white border-gray-100 text-gray-500 hover:border-primary/30 hover:text-primary hover:bg-primary/5',
							]"
							@click="toggleCategory(cat.id)"
						>
							{{ cat.name }}
							<Icon v-if="isCategorySelected(cat.id)" name="fa6-solid:circle-check" />
						</button>
					</div>
				</ClientOnly>
			</div>

			<!-- Brands -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"></div>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest"
						>Thương Hiệu</label
					>
				</div>
				<ClientOnly>
					<div v-if="isLoadingBrands" class="py-4 flex justify-center">
						<div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
					</div>
					<div v-else-if="brands.length > 0" class="grid grid-cols-2 gap-2">
						<button
							v-for="brand in brands"
							:key="brand.id"
							class="group flex items-center justify-center px-2 py-3 text-[10px] font-bold rounded-xl border transition-all duration-300"
							:class="[
								isBrandSelected(brand.id)
									? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
									: 'bg-white border-gray-100 text-gray-500 hover:border-primary hover:text-primary',
							]"
							@click="toggleBrand(brand.id)"
						>
							{{ brand.name }}
						</button>
					</div>
				</ClientOnly>
			</div>

			<!-- Price Range -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"></div>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest">Giá Xe</label>
				</div>
				
				<div class="space-y-8 px-2">
					<!-- Range Slider Container -->
					<div class="relative h-2 bg-gray-100 rounded-full">
						<!-- Active Track Highlight -->
						<div 
							class="absolute h-full bg-primary rounded-full shadow-[0_0_10px_rgba(227,24,55,0.3)] will-change-[left,right]"
							:style="{ 
								left: `${(minPrice / 500000000) * 100}%`, 
								right: `${100 - (maxPrice || 500000000) / 500000000 * 100}%` 
							}"
						></div>
						
						<!-- Min Slider -->
						<input
							v-model.number="minPrice"
							type="range"
							min="0"
							max="500000000"
							step="500000"
							class="absolute w-full h-full appearance-none bg-transparent pointer-events-none z-10"
							@input="minPrice = Math.min(minPrice, (maxPrice || 500000000) - 500000)"
						>
						
						<!-- Max Slider -->
						<input
							v-model.number="maxPrice"
							type="range"
							min="0"
							max="500000000"
							step="500000"
							class="absolute w-full h-full appearance-none bg-transparent pointer-events-none z-20"
							@input="maxPrice = Math.max(maxPrice || 0, minPrice + 500000)"
						>
					</div>

					<!-- Labels -->
					<div class="flex items-center justify-between">
						<div class="space-y-1">
							<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Từ</span>
							<p class="text-xs font-black text-gray-900">{{ formatVND(minPrice) }}</p>
						</div>
						<div class="text-right space-y-1">
							<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đến</span>
							<p class="text-xs font-black text-gray-900">{{ formatVND(maxPrice || 500000000) }}</p>
						</div>
					</div>

					<!-- Quick Presets -->
					<div class="flex flex-wrap gap-2 pt-2">
						<button 
							v-for="range in [
								{l:'Dưới 20tr', min:0, max:20000000}, 
								{l:'20-50tr', min:20000000, max:50000000}, 
								{l:'Trên 50tr', min:50000000, max:500000000}
							]" 
							:key="range.l"
							@click="minPrice = range.min; maxPrice = range.max"
							class="px-3 py-2 bg-white text-[9px] font-black text-gray-500 uppercase rounded-xl border border-gray-100 hover:border-primary hover:text-primary transition-all shadow-sm"
						>
							{{ range.l }}
						</button>
					</div>
				</div>
			</div>

			<!-- Dynamic Options (Brand, Color, VehicleType) -->
			<ClientOnly>
				<div v-if="isLoadingOptions" class="py-8 flex justify-center">
					<div class="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
				</div>

				<div v-else class="space-y-10">
					<div v-for="option in filteredOptions" :key="option.id" class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="w-1 h-4 bg-primary rounded-full"></div>
							<h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">
								{{ getOptionLabel(option.name) }}
							</h3>
						</div>
						<div class="grid grid-cols-2 gap-2">
							<template v-for="val in option.values" :key="val.id">
								<!-- Default Button -->
								<button
									class="px-3 py-3 text-[10px] font-bold rounded-xl border transition-all duration-300 text-center"
									:class="[
										isSelected(val)
											? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
											: 'bg-white border-gray-100 text-gray-500 hover:border-primary hover:text-primary',
									]"
									@click="toggleOption(val)"
								>
									{{ val.name }}
								</button>
							</template>
						</div>
					</div>
				</div>
			</ClientOnly>
		</div>
		<div class="p-6 border-t border-gray-100 bg-gray-50/50">
			<button
				class="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
				aria-label="Xóa tất cả các bộ lọc đang chọn"
				@click="resetFilters"
			>
				<Icon name="fa6-solid:rotate-left" class="text-sm" />
				Xóa tất cả bộ lọc
			</button>
		</div>
	</div>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.bg-primary {
	background-color: #e31837;
}
.border-primary {
	border-color: #e31837;
}
.focus\:ring-primary\/20:focus {
	--tw-ring-color: rgba(227, 24, 55, 0.2);
}
.focus\:border-primary:focus {
	border-color: #e31837;
}

.custom-scrollbar {
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE and Edge */
}
.custom-scrollbar::-webkit-scrollbar {
	display: none; /* Chrome, Safari and Opera */
}

/* Custom Multi-Range Slider Styling */
input[type="range"] {
	pointer-events: none;
}

input[type="range"]::-webkit-slider-thumb {
	appearance: none;
	width: 22px;
	height: 22px;
	background: #ffffff;
	border: 3px solid #e31837;
	border-radius: 50%;
	cursor: pointer;
	pointer-events: auto;
	box-shadow: 0 3px 8px rgba(0,0,0,0.2);
	transition: transform 0.15s ease-out;
	margin-top: -1px;
	will-change: transform;
}

input[type="range"]::-webkit-slider-thumb:hover {
	transform: scale(1.1);
	background: #e31837;
	border-color: #ffffff;
}

input[type="range"]::-webkit-slider-thumb:active {
	transform: scale(0.95);
	box-shadow: 0 0 0 10px rgba(227, 24, 55, 0.1);
}

input[type="range"]::-moz-range-thumb {
	width: 20px;
	height: 20px;
	background: #ffffff;
	border: 2px solid #e31837;
	border-radius: 50%;
	cursor: pointer;
	pointer-events: auto;
	box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

input[type="range"]::-moz-range-thumb:hover {
	transform: scale(1.2);
	background: #e31837;
	border-color: #ffffff;
}

/* Remove default track styles to avoid overlapping tracks */
input[type="range"]::-webkit-slider-runnable-track {
	background: transparent;
	border: none;
}
input[type="range"]::-moz-range-track {
	background: transparent;
	border: none;
}
</style>
