<script setup>
const props = defineProps({
	items: {
		type: Array,
		required: true,
		// Example: [{ label: 'Trang chủ', to: '/' }, { label: 'Sản phẩm', to: '/products' }]
	},
});
</script>

<template>
	<nav class="flex mb-8" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<NuxtLink
					to="/"
					class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
				>
					<Icon name="fa6-solid:house" class="mr-2 text-[10px]" />
					Trang chủ
				</NuxtLink>
			</li>
			<li v-for="(item, index) in items" :key="index">
				<div class="flex items-center">
					<Icon name="fa6-solid:chevron-right" class="text-gray-300 text-[8px] mx-1 md:mx-2" />
					<NuxtLink
						v-if="item.to"
						:to="item.to"
						class="text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
					>
						{{ item.label }}
					</NuxtLink>
					<span
						v-else
						class="text-xs font-bold text-gray-900 uppercase tracking-widest"
					>
						{{ item.label }}
					</span>
				</div>
			</li>
		</ol>
	</nav>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
</style>
