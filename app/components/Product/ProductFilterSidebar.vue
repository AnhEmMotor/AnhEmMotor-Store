<script setup>
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useBrandStore } from "@/stores/brand.store";

const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue", "close"]);

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();

const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
	queryKey: ["product-categories"],
	queryFn: () => categoryStore.getProductCategories(),
	staleTime: 1000 * 60 * 60,
});

const categories = computed(() => {
	if (categoriesData.value?.items) return categoriesData.value.items;
	if (Array.isArray(categoriesData.value)) return categoriesData.value;
	return [];
});

const { data: brandsData, isLoading: isLoadingBrands } = useQuery({
	queryKey: ["brands-list"],
	queryFn: () => brandStore.getBrands({ itemsPerPage: 100 }),
	staleTime: 1000 * 60 * 60,
});

const brands = computed(() => brandsData.value?.items || []);

const { data: optionsData, isLoading: isLoadingOptions } = useQuery({
	queryKey: ["product-options"],
	queryFn: () => productStore.getOptions(),
	staleTime: 1000 * 60 * 60,
});

const options = computed(() => optionsData.value || []);

const colorOption = computed(() => options.value.find(o => o.name === 'Color' || o.name === 'Màu sắc'));
const vehicleTypeOption = computed(() => options.value.find(o => o.name === 'VehicleType' || o.name === 'Loại xe'));

// Computed properties for v-model bindings
const searchQuery = computed({
	get: () => props.modelValue.search || "",
	set: (val) => emit("update:modelValue", { ...props.modelValue, search: val }),
});

const maxPrice = computed({
	get: () => props.modelValue.maxPrice || 200000000,
	set: (val) => emit("update:modelValue", { ...props.modelValue, maxPrice: val }),
});

const selectedCategories = computed({
	get: () => props.modelValue.category_ids || [],
	set: (val) => emit("update:modelValue", { ...props.modelValue, category_ids: val }),
});

const selectedBrands = computed({
	get: () => props.modelValue.brand_ids || [],
	set: (val) => emit("update:modelValue", { ...props.modelValue, brand_ids: val }),
});

const selectedOptions = computed({
	get: () => props.modelValue.optionValueIds || [],
	set: (val) => emit("update:modelValue", { ...props.modelValue, optionValueIds: val }),
});

// Helper functions
const toggleItem = (list, item) => {
	const current = [...list];
	const index = current.indexOf(item);
	if (index > -1) current.splice(index, 1);
	else current.push(item);
	return current;
};

const formatPrice = (val) => {
	return new Intl.NumberFormat("vi-VN").format(val) + "đ";
};
</script>

<template>
	<div class="flex flex-col h-full bg-white">
		<div class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
			<h2 class="text-lg font-black text-gray-900 flex items-center gap-2 uppercase tracking-tighter">
				<Icon name="fa6-solid:sliders" class="text-primary" />
				Bộ lọc sản phẩm
			</h2>
			<button class="lg:hidden text-gray-400 hover:text-gray-600" @click="emit('close')">
				<Icon name="fa6-solid:xmark" class="text-xl" />
			</button>
		</div>

		<div class="flex-1 overflow-y-auto p-6 space-y-12 custom-scrollbar">
			<!-- Search -->
			<div class="space-y-4">
				<label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
					<Icon name="fa6-solid:magnifying-glass" class="text-primary" />
					Tìm kiếm xe
				</label>
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Tên xe..."
					class="w-full pl-5 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:border-primary/30 transition-all outline-none text-xs font-bold shadow-sm"
				>
			</div>

			<!-- Price Slider (Thanh kéo) -->
			<UiBaseRangeInput
				v-model="maxPrice"
				label="Mức giá tối đa"
				:min="10000000"
				:max="200000000"
				:step="1000000"
				:display-value="formatPrice(maxPrice || 150000000)"
				sub-label="10tr - 200tr"
			/>

			<!-- Brands (Modern Chips) -->
			<div class="space-y-4">
				<label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Thương hiệu</label>
				<div class="flex flex-wrap gap-2">
					<div
						v-for="brand in brands"
						:key="brand.id"
						class="px-4 py-2.5 rounded-xl cursor-pointer transition-all border-2 text-[11px] font-black uppercase tracking-wider"
						:class="selectedBrands.includes(brand.id) ? 'bg-gray-900 border-gray-900 text-white shadow-lg' : 'bg-white border-gray-50 text-gray-400 hover:border-gray-200'"
						@click="selectedBrands = toggleItem(selectedBrands, brand.id)"
					>
						{{ brand.name }}
					</div>
				</div>
			</div>

			<!-- Color (Option) -->
			<div v-if="colorOption" class="space-y-4">
				<label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Màu sắc</label>
				<div class="flex flex-wrap gap-3">
					<div
						v-for="val in colorOption.values"
						:key="val.id"
						class="group relative"
						@click="selectedOptions = toggleItem(selectedOptions, val.id)"
					>
						<!-- Color Circle -->
						<div 
							class="w-10 h-10 rounded-full cursor-pointer transition-all border-2 flex items-center justify-center shadow-sm hover:scale-110 active:scale-95"
							:style="{ backgroundColor: val.colorCode || '#CCCCCC' }"
							:class="[
								selectedOptions.includes(val.id) ? 'border-gray-900 ring-2 ring-gray-900/20 ring-offset-2' : 'border-gray-100',
								val.colorCode?.toLowerCase() === '#ffffff' ? 'border-gray-200' : ''
							]"
						>
							<Icon 
								v-if="selectedOptions.includes(val.id)" 
								name="fa6-solid:check" 
								:class="val.colorCode?.toLowerCase() === '#ffffff' ? 'text-gray-900' : 'text-white'"
								class="text-xs"
							/>
						</div>
						
						<!-- Tooltip (Color Name) -->
						<span class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[9px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
							{{ val.name }}
						</span>
					</div>
				</div>
			</div>

			<!-- Vehicle Type (Option) -->
			<div v-if="vehicleTypeOption" class="space-y-4">
				<label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Loại xe</label>
				<div class="space-y-2">
					<div
						v-for="val in vehicleTypeOption.values"
						:key="val.id"
						class="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border shadow-sm"
						:class="selectedOptions.includes(val.id) ? 'bg-white border-primary/20 ring-1 ring-primary/10' : 'bg-white/50 border-gray-50 text-gray-500 hover:bg-white'"
						@click="selectedOptions = toggleItem(selectedOptions, val.id)"
					>
						<span class="text-[11px] font-bold" :class="selectedOptions.includes(val.id) ? 'text-gray-900' : 'text-gray-500'">{{ val.name }}</span>
						<div class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
							:class="selectedOptions.includes(val.id) ? 'bg-primary border-primary' : 'border-gray-100'"
						>
							<Icon v-if="selectedOptions.includes(val.id)" name="fa6-solid:check" class="text-white text-[10px]" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="p-6 border-t border-gray-100 bg-gray-50/50">
			<button
				class="w-full py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
				@click="emit('update:modelValue', { search: '', optionValueIds: [], category_ids: [], brand_ids: [], maxPrice: 200000000, needs: [] })"
			>
				<Icon name="fa6-solid:rotate-left" />
				Xóa tất cả bộ lọc
			</button>
		</div>
	</div>
</template>

<style scoped>
.text-primary { color: #e31837; }
.bg-primary { background-color: #e31837; }
.border-primary { border-color: #e31837; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
</style>

