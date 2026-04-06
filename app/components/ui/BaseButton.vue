<script setup>
defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: "button",
	},
	icon: {
		type: String,
		default: "fa6-solid:paper-plane",
	},
	to: {
		type: [String, Object],
		default: null,
	},
});
</script>

<template>
	<component
		:is="to ? 'NuxtLink' : 'button'"
		v-bind="to ? { to } : { type }"
		:disabled="loading"
		class="w-full md:w-48 h-12 bg-red-600 hover:bg-white hover:text-red-600 border-2 border-transparent rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group text-white inline-flex items-center justify-center"
	>
		<span v-if="!loading" class="flex items-center justify-center gap-2">
			<slot />
			<Icon
				v-if="icon"
				:name="icon"
				class="text-xs transition-transform group-hover:translate-x-1"
			/>
		</span>
		<Icon v-else name="fa6-solid:circle-notch" class="animate-spin text-xl" />
	</component>
</template>
