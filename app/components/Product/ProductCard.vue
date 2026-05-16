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
		class="group relative bg-white rounded-24 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-slate-100 flex flex-col h-full"
	>
		<div class="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-slate-50">
			<img
				:src="currentImage"
				:alt="product.name"
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			>
			
			<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

			<!-- Compare Toggle -->
			<button 
				@click="toggleCompare"
				class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-md border"
				:class="isCompared ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-white/80 border-slate-100 text-slate-400 hover:text-primary hover:bg-white'"
				:title="isCompared ? 'Xóa khỏi danh sách so sánh' : 'Thêm vào so sánh'"
			>
				<Icon :name="isCompared ? 'ph:check-bold' : 'ph:git-diff-bold'" class="text-lg" />
			</button>

			<div v-if="product.brand" class="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
				{{ product.brand }}
			</div>
		</div>

		<div class="p-4 sm:p-5 flex flex-col flex-1">
			<!-- Product Name -->
			<h3
				class="text-slate-900 font-bold text-base sm:text-lg mb-3 sm:mb-4 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-primary transition-colors"
			>
				{{ product.name }}
			</h3>
            
            <div class="flex flex-col gap-1 mb-6">
                <span class="text-xs text-slate-400 font-medium">Giá từ</span>
                <span class="text-primary font-bold text-xl sm:text-2xl tracking-tight">{{ currentPrice }}</span>
            </div>

			<!-- Price and Action -->
			<div class="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
				<div
					v-if="showAction"
					class="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all duration-300 hover:bg-primary shadow-sm flex items-center justify-center gap-2"
				>
					Xem chi tiết
					<Icon name="ph:arrow-right-bold" class="text-sm" />
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
