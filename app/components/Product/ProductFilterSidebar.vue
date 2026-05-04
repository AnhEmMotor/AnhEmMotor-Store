<script setup>
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue", "close"]);

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const {
	data: categoriesData,
	isLoading: isLoadingCategories,
	error: categoriesError,
} = useQuery({
	queryKey: ["product-categories"],
	queryFn: () => categoryStore.getProductCategories(),
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
});

const options = computed(() => optionsData.value || []);

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

const isSelected = (valueId) => selectedOptions.value.includes(valueId);

const toggleOption = (valueId) => {
	const current = [...selectedOptions.value];
	const index = current.indexOf(valueId);
	if (index > -1) {
		current.splice(index, 1);
	} else {
		current.push(valueId);
	}
	selectedOptions.value = current;
};

const resetFilters = () => {
	emit("update:modelValue", {
		search: "",
		optionValueIds: [],
		category_ids: [],
	});
};

const optionLabels = {
	BrakeSystem: "Hệ thống phanh",
	Color: "Màu sắc",
	Condition: "Tình trạng",
	Displacement: "Dung tích xi lanh",
	ManufactureYear: "Năm sản xuất",
	Material: "Chất liệu",
	Size: "Kích thước",
	Style: "Kiểu dáng",
	VehicleType: "Loại xe",
};

const getOptionLabel = (name) => optionLabels[name] || name;
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

		<div class="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
			<div class="space-y-3">
				<label class="text-sm font-bold text-gray-900 uppercase tracking-wider"
					>Tìm kiếm</label
				>
				<div class="relative">
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Nhập tên sản phẩm..."
						class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
					>
					<Icon
						name="fa6-solid:magnifying-glass"
						class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
					/>
				</div>
			</div>

			<div class="space-y-3">
				<label class="text-sm font-bold text-gray-900 uppercase tracking-wider"
					>Danh mục</label
				>
				<div v-if="isLoadingCategories" class="space-y-2">
					<div
						v-for="i in 3"
						:key="i"
						class="animate-pulse h-8 bg-gray-100 rounded-lg"
					/>
				</div>
				<div v-else-if="categoriesError" class="text-sm text-red-500">
					{{ categoriesError.message || categoriesError }}
				</div>
				<div v-else-if="categories.length > 0" class="grid grid-cols-2 gap-2">
					<button
						v-for="cat in categories"
						:key="cat.id"
						class="px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-300 text-center"
						:class="[
							isCategorySelected(cat.id)
								? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
								: 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
						]"
						:aria-label="'Lọc theo danh mục ' + cat.name"
						@click="toggleCategory(cat.id)"
					>
						{{ cat.name }}
					</button>
				</div>
			</div>

			<div v-if="isLoadingOptions" class="space-y-4">
				<div v-for="i in 3" :key="i" class="animate-pulse space-y-3">
					<div class="h-4 bg-gray-200 rounded w-1/3" />
					<div class="grid grid-cols-2 gap-2">
						<div v-for="j in 4" :key="j" class="h-8 bg-gray-100 rounded" />
					</div>
				</div>
			</div>

			<div v-else-if="optionsError" class="text-center py-4">
				<p class="text-red-500 text-sm mb-2">
					{{ optionsError.message || optionsError }}
				</p>
				<button
					class="text-primary font-bold text-xs uppercase"
					aria-label="Thử lại tải dữ liệu bộ lọc"
					@click="fetchOptionsManual"
				>
					Thử lại
				</button>
			</div>

			<div v-else-if="options.length > 0" class="space-y-8">
				<div v-for="option in options" :key="option.id" class="space-y-3">
					<h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider">
						{{ getOptionLabel(option.name) }}
					</h3>
					<div class="grid grid-cols-2 gap-2">
						<button
							v-for="val in option.values"
							:key="val.id"
							class="px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-300 text-center"
							:class="[
								isSelected(val.id)
									? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
									: 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
							]"
							:aria-label="'Lọc theo ' + val.name"
							@click="toggleOption(val.id)"
						>
							{{ val.name }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="p-6 border-t border-gray-100 bg-gray-50/50">
			<button
				class="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98]"
				aria-label="Xóa tất cả các bộ lọc đang chọn"
				@click="resetFilters"
			>
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

.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #e5e7eb;
	border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #d1d5db;
}
</style>
