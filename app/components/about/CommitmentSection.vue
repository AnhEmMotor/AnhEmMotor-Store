<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-24 bg-white">
		<div class="max-w-7xl mx-auto px-6">
			<h2 class="text-3xl md:text-5xl font-black text-center mb-16 text-gray-900 uppercase tracking-tight">
				{{ data.title }}
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				<AboutCommitmentCard 
					v-for="(item, index) in data.list" 
					:key="index"
					:item="item"
					:is-full-width="index === data.list.length - 1 && data.list.length % 2 !== 0"
				/>
			</div>

		</div>
	</section>
</template>


