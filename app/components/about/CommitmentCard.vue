<script setup>
defineProps({
	item: {
		type: String,
		required: true,
	},
	isFullWidth: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div 
		class="flex items-center p-8 bg-red-50 rounded-[28px] border border-red-100 transition-transform hover:scale-[1.02] duration-300"
		:class="{ 'md:col-span-2': isFullWidth }"
	>
		<div class="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl mr-8 flex-shrink-0 shadow-lg shadow-red-200">
			✓
		</div>
		<p class="text-xl font-extrabold text-gray-800 leading-tight">{{ item }}</p>
	</div>
</template>
