<script setup>
const props = defineProps({
	variantId: { type: Number, required: true },
	slug: { type: String, default: null },
	colorName: { type: String, default: "" },
	sku: { type: String, default: "" },
	price: { type: Number, default: null },
});

const goToProduct = () => {
	if (!props.slug) return;
	navigateTo(`/product/${props.slug}`);
};
</script>

<template>
	<button
		class="flex items-center justify-between gap-3 w-full p-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all text-left"
		:class="slug ? 'hover:border-primary/30 hover:shadow-md' : 'opacity-50 cursor-not-allowed'"
		:disabled="!slug"
		@click="goToProduct"
	>
		<div class="min-w-0 flex-1">
			<p class="text-[11px] font-black text-gray-900 truncate">{{ colorName }}</p>
			<p class="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{{ sku }}</p>
		</div>
		<p class="text-[10px] font-black text-primary shrink-0">{{ productMapper.formatPrice(price) }}</p>
	</button>
</template>
