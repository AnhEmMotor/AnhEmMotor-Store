<script setup>
defineProps({
	data: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<section class="py-24 bg-gray-50">
		<div class="max-w-7xl mx-auto px-6">
			<h2 class="text-3xl md:text-5xl font-black text-center mb-16 text-gray-900 uppercase tracking-tight">
				{{ data.title }}
			</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<AboutServiceCard 
					v-for="(item, index) in data.items" 
					:key="index"
					:item="item"
					:index="index"
				/>
			</div>

		</div>
	</section>
</template>


