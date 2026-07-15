<script setup>
import { computed, onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { categoryMapper } from "../../mappers/category.mapper";


const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue", "close"]);

const productStore = useProductStore();
const MAX_PRICE = 60000000;


const {
	data: filterFacetsData,
	isLoading: isLoadingFilterFacets,
	isError: isFilterFacetsError,
} = useQuery({
	queryKey: computed(() => ["product-filter-facets", props.modelValue.category_ids]),
	queryFn: async () => {
		const categoryIds = props.modelValue.category_ids || [];
		const params = {
			page: 1,
			pageSize: 200,
		};
		if (categoryIds.length > 0) {
			params.categoryIds = categoryIds.join(",");
		}
		// Fetch all products (page size 200 covers all 80 items) to extract unique brands
		const response = await productStore.getProducts(params);

		const brandsById = new Map();
		const versionsSet = new Set();
		const colorsSet = new Set();

		for (const product of response.items || []) {
			if (product.brandId && product.brand) {
				brandsById.set(product.brandId, {
					id: product.brandId,
					name: product.brand,
				});
			}

			for (const v of product.variants || []) {
				const verName = v.option_values_text || v.variantName || v.name;
				if (verName) {
					const cleanVer = verName.split(" - ")[0].trim();
					if (cleanVer) {
						versionsSet.add(cleanVer);
					}
				}
				for (const c of v.colors || []) {
					const colName = c.name || c.colorName;
					if (colName) {
						colorsSet.add(colName.trim());
					}
				}
			}
		}

		return {
			brands: [...brandsById.values()].sort((a, b) => a.name.localeCompare(b.name, "vi")),
			versions: [...versionsSet].sort((a, b) => a.localeCompare(b, "vi")),
			colors: [...colorsSet].sort((a, b) => a.localeCompare(b, "vi")),
		};
	},
	staleTime: 1000 * 60 * 60,
	placeholderData: (prev) => prev,
});

const brands = computed(() => filterFacetsData.value?.brands || []);
const versions = computed(() => filterFacetsData.value?.versions || []);
const colors = computed(() => filterFacetsData.value?.colors || []);

const staticCategories = [
	{ id: 13, name: "Phụ tùng" },
	{ id: 8, name: "Xe máy" },
	{ id: 12, name: "Phụ kiện" },
];

const isCategorySelected = (catId) => {
	return (props.modelValue.category_ids || []).includes(catId);
};

const toggleCategory = (catId) => {
	const current = [...(props.modelValue.category_ids || [])];
	const index = current.indexOf(catId);
	if (index > -1) {
		current.splice(index, 1);
	} else {
		current.push(catId);
	}
	emit("update:modelValue", { ...props.modelValue, category_ids: current });
};

const selectedBrandId = computed({
	get: () => {
		const ids = props.modelValue.brand_ids || [];
		return ids.length > 0 ? ids[0] : "";
	},
	set: (val) => {
		const ids = val ? [Number(val)] : [];
		emit("update:modelValue", { ...props.modelValue, brand_ids: ids });
	},
});


const {
	data: optionsData,
	isLoading: isLoadingOptions,
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

const selectedOptions = computed({
	get: () => props.modelValue.optionValueIds || [],
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, optionValueIds: val });
	},
});

const search = computed({
	get: () => props.modelValue.search || "",
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, search: val });
	},
});


const minPrice = computed({
	get: () => props.modelValue.minPrice ?? 0,
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, minPrice: val });
	},
});

const maxPrice = computed({
	get: () => props.modelValue.maxPrice ?? MAX_PRICE,
	set: (val) => {
		emit("update:modelValue", { ...props.modelValue, maxPrice: val });
	},
});


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
		versions: [],
		colors: [],
	});
};

const selectedVersion = computed({
	get: () => {
		const vers = props.modelValue.versions || [];
		return vers.length > 0 ? vers[0] : "";
	},
	set: (val) => {
		const vers = val ? [val] : [];
		emit("update:modelValue", { ...props.modelValue, versions: vers });
	},
});

const isColorSelected = (color) => (props.modelValue.colors || []).includes(color);
const toggleColor = (color) => {
	const current = [...(props.modelValue.colors || [])];
	const index = current.indexOf(color);
	if (index > -1) {
		current.splice(index, 1);
	} else {
		current.push(color);
	}
	emit("update:modelValue", { ...props.modelValue, colors: current });
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

const searchArticle = (event) => {
	console.log("Search input change:", event.target.value);
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
			<!-- Search -->
			<div class="space-y-3">
				<span class="text-sm font-black text-gray-900 uppercase tracking-widest">
					Tìm kiếm
				</span>
				<div class="relative">
					<Icon
						name="fa6-solid:magnifying-glass"
						class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
					/>
					<input
						v-model="search"
						type="search"
						aria-label="Tìm kiếm sản phẩm"
						placeholder="Tên xe, phiên bản, màu sắc..."
						class="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
						@input="searchArticle"
					>
				</div>
			</div>

			<!-- Brands -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"/>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest"
						>Thương Hiệu</label
					>
				</div>
				<ClientOnly>
					<div v-if="isLoadingFilterFacets" class="py-4 flex justify-center">
						<div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"/>
					</div>
					<p
						v-else-if="isFilterFacetsError"
						class="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
					>
						Không thể tải danh sách thương hiệu.
					</p>
					<div v-else class="relative">
						<select
							v-model="selectedBrandId"
							class="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none font-semibold text-gray-800 cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
						>
							<option value="">Chọn tất cả</option>
							<option v-for="brand in brands" :key="brand.id" :value="brand.id">
								{{ brand.name }}
							</option>
						</select>
						<Icon
							name="ph:caret-down-bold"
							class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm"
						/>
					</div>
				</ClientOnly>
			</div>

			<!-- Categories (Danh mục) -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"/>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest">Danh Mục</label>
				</div>
				<div class="grid grid-cols-2 gap-2">
					<button
						v-for="cat in staticCategories"
						:key="cat.id"
						class="px-3 py-3 text-[11px] font-bold rounded-xl border transition-all duration-300 text-center min-h-[44px]"
						:class="[
							isCategorySelected(cat.id)
								? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
								: 'bg-white border-gray-100 text-gray-500 hover:border-primary hover:text-primary',
						]"
						@click="toggleCategory(cat.id)"
					>
						{{ cat.name }}
					</button>
				</div>
			</div>



			<!-- Price Range -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="w-1 h-4 bg-primary rounded-full"/>
					<label class="text-sm font-black text-gray-900 uppercase tracking-widest">Giá sản phẩm</label>
				</div>
				
				<div class="space-y-8 px-2">
					<!-- Range Slider Container -->
					<div class="relative h-2 bg-gray-100 rounded-full">
						<!-- Active Track Highlight -->
						<div 
							class="absolute h-full bg-primary rounded-full shadow-[0_0_10px_rgba(227,24,55,0.3)] will-change-[left,right]"
							:style="{
								left: `${(minPrice / MAX_PRICE) * 100}%`,
								right: `${100 - (maxPrice || MAX_PRICE) / MAX_PRICE * 100}%`
							}"
						/>
						
						<!-- Min Slider -->
						<input
							v-model.number="minPrice"
							type="range"
							min="0"
							:max="MAX_PRICE"
							step="500000"
							class="absolute w-full h-full appearance-none bg-transparent pointer-events-none z-10"
							@input="minPrice = Math.min(minPrice, (maxPrice || MAX_PRICE) - 500000)"
						>
						
						<!-- Max Slider -->
						<input
							v-model.number="maxPrice"
							type="range"
							min="0"
							:max="MAX_PRICE"
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
							<p class="text-xs font-black text-gray-900">{{ formatVND(maxPrice || MAX_PRICE) }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Dynamic Options (Brand, Color, VehicleType) -->
			<ClientOnly>
				<div v-if="isLoadingOptions" class="py-8 flex justify-center">
					<div class="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"/>
				</div>

				<div v-else class="space-y-10">
					<div v-for="option in filteredOptions" :key="option.id" class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="w-1 h-4 bg-primary rounded-full"/>
							<h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">
								{{ getOptionLabel(option.name) }}
							</h3>
						</div>
						<div class="grid grid-cols-3 sm:grid-cols-2 gap-2">
							<template v-for="val in option.values" :key="val.id">
								<!-- Default Button -->
								<button
									class="px-3 py-3 text-[11px] font-bold rounded-xl border transition-all duration-300 text-center min-h-[44px]"
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

					<!-- Phiên bản -->
					<div v-if="versions.length > 0" class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="w-1 h-4 bg-primary rounded-full"/>
							<h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">
								Phiên Bản
							</h3>
						</div>
						<div class="relative">
							<select
								v-model="selectedVersion"
								class="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none font-semibold text-gray-800 cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
							>
								<option value="">Chọn tất cả</option>
								<option v-for="ver in versions" :key="ver" :value="ver">
									{{ ver }}
								</option>
							</select>
							<Icon
								name="ph:caret-down-bold"
								class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm"
							/>
						</div>
					</div>

					<!-- Màu sắc -->
					<div v-if="colors.length > 0" class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="w-1 h-4 bg-primary rounded-full"/>
							<h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">
								Màu Sắc
							</h3>
						</div>
						<div class="grid grid-cols-3 sm:grid-cols-2 gap-2">
							<button
								v-for="col in colors"
								:key="col"
								class="px-3 py-3 text-[11px] font-bold rounded-xl border transition-all duration-300 text-center min-h-[44px]"
								:class="[
									isColorSelected(col)
										? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
										: 'bg-white border-gray-100 text-gray-500 hover:border-primary hover:text-primary',
								]"
								@click="toggleColor(col)"
							>
								{{ col }}
							</button>
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

