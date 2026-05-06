<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
	showAction: {
		type: Boolean,
		default: false,
	},
});

const selectedVariant = ref(null);

watch(() => props.product, (newProd) => {
	if (newProd?.variants?.length > 0) {
		selectedVariant.value = newProd.variants[0];
	} else {
		selectedVariant.value = null;
	}
}, { immediate: true });

const currentPrice = computed(() => {
	if (!selectedVariant.value) return "N/A";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(selectedVariant.value.price);
});

const currentImage = computed(() => {
	return (
		selectedVariant.value?.cover_image_url ||
		"/assets/image/placeholder-product.webp"
	);
});

const currentUrl = computed(() => {
	return selectedVariant.value?.url
		? `/product/${selectedVariant.value.url}`
		: "#";
});

const variantSelectId = useId();

// Comparison Logic

const compareStore = useCompareStore();
const isCompared = computed(() => compareStore.products.some(p => p.id === props.product.id));

const toggleCompare = (e) => {
	e.preventDefault();
	e.stopPropagation();
	if (isCompared.value) {
		compareStore.removeProduct(props.product.id);
	} else {
		compareStore.addProduct({
			id: props.product.id,
			name: props.product.name,
			slug: props.product.slug,
			brand: props.product.brand,
			image: currentImage.value,
			price: selectedVariant.value?.price
		});
	}
};
</script>

<template>
	<NuxtLink
		:to="currentUrl"
		class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
	>
		<div class="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100">
			<img
				:src="currentImage"
				:alt="product.name"
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			>
			<!-- Compare Toggle -->
			<button 
				@click="toggleCompare"
				class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-md border"
				:class="isCompared ? 'bg-[#CC0000] border-[#CC0000] text-white shadow-lg shadow-red-500/30' : 'bg-white/80 border-gray-100 text-gray-400 hover:text-[#CC0000] hover:bg-white'"
				:title="isCompared ? 'Xóa khỏi danh sách so sánh' : 'Thêm vào so sánh'"
			>
				<Icon :name="isCompared ? 'fa6-solid:check' : 'fa6-solid:code-compare'" class="text-sm" />
			</button>
		</div>

		<div class="p-4 flex flex-col flex-1">
			<!-- Brand Name -->
			<div v-if="product.brand" class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
				{{ product.brand }}
			</div>

			<!-- Product Name -->
			<h3
				class="text-gray-900 font-bold text-lg mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors"
			>
				{{ product.name }}
			</h3>

			<!-- Variant Thumbnails -->
			<div
				v-if="product.variants && product.variants.length > 1"
				class="mb-6 flex flex-wrap gap-2 items-center"
				@click.stop.prevent
			>
				<div 
					v-for="(v, index) in product.variants.slice(0, 3)" 
					:key="v.url"
					@click="selectedVariant = v"
					class="w-12 h-12 rounded-lg border-2 overflow-hidden cursor-pointer transition-all duration-300"
					:class="selectedVariant?.url === v.url ? 'border-primary scale-105 shadow-sm' : 'border-gray-50 hover:border-gray-200'"
					:title="v.propertyName"
				>
					<img 
						:src="v.cover_image_url || '/assets/image/placeholder-product.webp'" 
						class="w-full h-full object-cover"
						:alt="v.propertyName"
					/>
				</div>
				<!-- Plus Indicator -->
				<div 
					v-if="product.variants.length > 3" 
					class="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-bold shrink-0"
				>
					+{{ product.variants.length - 3 }}
				</div>
			</div>

			<!-- Price and Action -->
			<div class="mt-auto flex items-center justify-between">
				<div class="flex flex-col">
					<span class="text-xs text-gray-400 uppercase font-semibold">Giá</span>
					<span class="text-primary font-bold text-xl">{{ currentPrice }}</span>
				</div>
				<div
					v-if="showAction"
					class="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-red-600 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-red-600/20 active:scale-95 flex items-center gap-2"
				>
					Xem chi tiết
					<Icon name="fa6-solid:chevron-right" class="text-[8px]" />
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.group:hover .text-primary {
	color: #c4122d;
}
</style>
