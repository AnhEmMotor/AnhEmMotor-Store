<script setup>
const props = defineProps({
	productId: { type: Number, required: true },
	name: { type: String, default: "" },
	imageUrl: { type: String, default: null },
	priceFrom: { type: Number, default: null },
	priceTo: { type: Number, default: null },
});

const emit = defineEmits(["view-variants"]);

const priceLabel = computed(() => {
	if (!props.priceFrom) return "Liên hệ";
	if (props.priceTo && props.priceTo !== props.priceFrom) {
		return `${productMapper.formatPrice(props.priceFrom)} - ${productMapper.formatPrice(props.priceTo)}`;
	}
	return productMapper.formatPrice(props.priceFrom);
});
</script>

<template>
	<button
		class="flex items-center gap-3 w-full p-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all text-left"
		@click="emit('view-variants', productId, name)"
	>
		<img
			:src="getImageUrl(imageUrl)"
			:alt="name"
			class="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-50"
			loading="lazy"
			@error="$event.target.src = '/assets/image/placeholder-product.webp'"
		>
		<div class="min-w-0 flex-1">
			<p class="text-[11px] font-black text-gray-900 truncate">{{ name }}</p>
			<p class="text-[10px] font-bold text-primary mt-0.5">{{ priceLabel }}</p>
		</div>
		<Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[10px] shrink-0" />
	</button>
</template>
