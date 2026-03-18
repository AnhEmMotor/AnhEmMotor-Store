<script setup>
import { ref, computed } from "vue";

const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
});

const selectedVariant = ref(
	props.product.variants && props.product.variants.length > 0
		? props.product.variants[0]
		: null,
);

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
</script>

<template>
	<NuxtLink
		:to="currentUrl"
		class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
	>
		<!-- Image Container -->
		<div class="relative aspect-[4/3] overflow-hidden bg-gray-50">
			<img
				:src="currentImage"
				:alt="product.name"
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			>
		</div>

		<!-- Content -->
		<div class="p-4 flex flex-col flex-1">
			<h3
				class="text-gray-900 font-bold text-lg mb-1 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors"
			>
				{{ product.name }}
			</h3>

			<p v-if="selectedVariant" class="text-gray-500 text-sm mb-4">
				<span class="font-medium text-gray-700">Đã chọn:</span>
				{{ selectedVariant.propertyName }}
			</p>

			<!-- Dropdown Biến thể -->
			<div
				v-if="product.variants && product.variants.length > 1"
				class="mb-4"
				@click.prevent
			>
				<label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
					>Phiên bản</label
				>
				<select
					v-model="selectedVariant"
					class="w-full px-3 py-2 border rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
				>
					<option v-for="v in product.variants" :key="v.url" :value="v">
						{{ v.propertyName }}
					</option>
				</select>
			</div>

			<div class="mt-auto flex items-center justify-between">
				<div class="flex flex-col">
					<span class="text-xs text-gray-400 uppercase font-semibold">Giá</span>
					<span class="text-primary font-bold text-xl">{{ currentPrice }}</span>
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
