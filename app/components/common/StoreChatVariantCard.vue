<script setup>
const props = defineProps({
	variantId: { type: Number, required: true },
	slug: { type: String, default: null },
	variantName: { type: String, default: "" },
	productName: { type: String, default: "" },
	sku: { type: String, default: "" },
	price: { type: Number, default: null },
	colors: { type: Array, default: () => [] },
});

const showColors = ref(false);
const selectedColor = ref(null);

const goToVariant = (colorId, color) => {
	if (!props.slug || props.variantId == null) return;
	selectedColor.value = color ?? null;
	const colorQuery = colorId != null ? `&color=${colorId}` : "";
	navigateTo(`/product/${props.slug}?variant=${props.variantId}${colorQuery}`);
};

const onCardClick = () => {
	if (props.colors.length > 0) {
		showColors.value = !showColors.value;
		return;
	}
	goToVariant(null);
};
</script>

<template>
	<div class="w-full">
		<button
			class="flex items-center justify-between gap-3 w-full p-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all text-left"
			:class="slug ? 'hover:border-primary/30 hover:shadow-md' : 'opacity-50 cursor-not-allowed'"
			:disabled="!slug"
			@click="onCardClick"
		>
			<div class="min-w-0 flex-1">
				<p v-if="productName" class="text-[9px] font-bold text-gray-400 uppercase tracking-wider truncate">
					{{ productName }}
				</p>
				<p class="text-[11px] font-black text-gray-900 truncate">{{ variantName }}</p>
				<p class="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{{ sku }}</p>
				<p v-if="selectedColor" class="text-[9px] font-bold text-primary mt-0.5">
					Màu: {{ selectedColor.colorName }}
				</p>
			</div>
			<p class="text-[10px] font-black text-primary shrink-0">{{ productMapper.formatPrice(price) }}</p>
		</button>
		<div v-if="showColors" class="flex flex-wrap gap-1.5 mt-1.5 pl-1">
			<button
				v-for="color in colors"
				:key="color.colorId"
				class="flex items-center gap-1 pl-1 pr-2 h-6 rounded-full border transition-all"
				:class="selectedColor?.colorId === color.colorId ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/40'"
				@click="goToVariant(color.colorId, color)"
			>
				<span
					class="w-3.5 h-3.5 rounded-full border border-gray-200 shrink-0"
					:style="{ backgroundColor: color.colorCode || '#ccc' }"
				/>
				<span class="text-[9px] font-bold text-gray-700 whitespace-nowrap">{{ color.colorName }}</span>
			</button>
		</div>
	</div>
</template>
