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
	if (!selectedVariant.value) return "Liên hệ";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(selectedVariant.value.price);
});

const currentImage = computed(() => {
	return (
		selectedVariant.value?.cover_image_url ||
		selectedVariant.value?.image ||
		"/assets/image/placeholder-product.webp"
	);
});

const currentUrl = computed(() => {
	return selectedVariant.value?.url || selectedVariant.value?.urlSlug
		? `/product/${selectedVariant.value.url || selectedVariant.value.urlSlug}`
		: "#";
});

const selectVariant = (variant) => {
	selectedVariant.value = variant;
};
</script>

<template>
	<div class="group flex flex-col bg-white p-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] border border-transparent hover:border-gray-100 relative overflow-hidden h-full">
		<!-- Badges Overlay -->
		<div class="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
			<div v-if="product.isBestSeller" class="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
				<Icon name="fa6-solid:crown" />
				BÁN CHẠY
			</div>
			<div v-if="product.isHot" class="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
				<Icon name="fa6-solid:fire" class="animate-pulse" />
				HOT
			</div>
			<div v-if="product.isGoodPrice" class="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
				<Icon name="fa6-solid:tag" />
				GIÁ TỐT
			</div>
		</div>

		<!-- Main Image Container -->
		<NuxtLink :to="currentUrl" class="relative block aspect-[4/3] overflow-hidden bg-gray-50 rounded-2xl mb-6">
			<img
				:src="currentImage"
				:alt="product.name"
				class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
			>
			<!-- Status Overlay -->
			<div v-if="product.inStock" class="absolute bottom-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-900 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-gray-100">
				Sẵn xe giao ngay
			</div>
		</NuxtLink>

		<!-- Brand & Quick Specs -->
		<div class="flex items-center justify-between mb-1.5">
			<span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
				{{ product.brand || 'HONDA' }}
			</span>
			<div class="flex gap-2.5">
				<div title="Dung tích xi lanh" class="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">
					<Icon name="fa6-solid:bolt-lightning" />
					{{ product.displacement }}cc
				</div>
				<div v-if="product.hasABS" title="Phanh ABS" class="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">
					<Icon name="fa6-solid:shield-halved" />
					ABS
				</div>
				<div v-if="product.hasPGMFI" title="Phun xăng điện tử" class="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-primary transition-colors">
					<Icon name="fa6-solid:droplet" />
					FI
				</div>
			</div>
		</div>

		<!-- Product Name -->
		<NuxtLink :to="currentUrl" class="mb-4 block">
			<h3 class="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tighter">
				{{ product.name }}
			</h3>
		</NuxtLink>

		<!-- Price & Installment -->
		<div class="mb-8 flex flex-col">
			<div class="flex items-baseline gap-2 mb-1.5">
				<span class="text-[28px] font-black text-primary tracking-tighter leading-none">
					{{ currentPrice }}
				</span>
			</div>
			<div class="flex flex-col gap-1.5">
				<div class="flex items-center gap-2">
					<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trả trước từ</span>
					<span class="text-[11px] font-black text-gray-700">{{ new Intl.NumberFormat("vi-VN").format(product.installmentAmount) }}đ</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Góp chỉ từ</span>
					<span class="text-[11px] font-black text-gray-700">{{ new Intl.NumberFormat("vi-VN").format(product.monthlyInstallment) }}đ/tháng</span>
				</div>
			</div>
		</div>

		<!-- CTA Button -->
		<NuxtLink 
			:to="currentUrl"
			class="mt-auto py-4 bg-gray-900 group-hover:bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shadow-xl shadow-gray-900/10 group-hover:shadow-primary/30 transform group-hover:-translate-y-1"
		>
			Nhận báo giá
			<Icon name="fa6-solid:chevron-right" class="text-[10px] transition-transform group-hover:translate-x-1" />
		</NuxtLink>

		<!-- Variant Thumbnails (On Hover) -->
		<div v-if="product.variants && product.variants.length > 1" class="absolute bottom-4 left-5 right-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-gray-100 shadow-2xl z-20">
			<div class="flex items-center gap-2">
				<div 
					v-for="(variant, index) in product.variants.slice(0, 4)" 
					:key="index"
					@click.stop.prevent="selectVariant(variant)"
					class="w-10 h-10 rounded-lg border-2 p-0.5 cursor-pointer transition-all overflow-hidden bg-white"
					:class="selectedVariant?.id === variant.id ? 'border-primary' : 'border-gray-100 hover:border-primary/50'"
				>
					<img 
						:src="variant.cover_image_url || variant.image || '/assets/image/placeholder-product.webp'" 
						:alt="variant.propertyName"
						class="w-full h-full object-cover rounded-md"
					>
				</div>
				<div v-if="product.variants.length > 4" class="text-gray-400 font-bold text-[10px] ml-auto pr-1">
					+{{ product.variants.length - 4 }} bản
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.group:hover .text-primary {
	color: #c4122d;
}
</style>

