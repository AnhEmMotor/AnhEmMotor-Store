<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	highlightText: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
	linkText: {
		type: String,
		default: "",
	},
	linkTo: {
		type: String,
		default: "",
	},
	center: {
		type: Boolean,
		default: false,
	},
	showSeparator: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div
		:class="[
			'flex flex-col gap-10 mb-16',
			center
				? 'items-center text-center'
				: 'md:flex-row justify-between items-end',
		]"
	>
		<div :class="['space-y-4', center ? 'w-full' : '']">
			<h2
				class="text-3xl md:text-5xl font-black uppercase text-gray-900 leading-tight"
			>
				{{ title }}
				<span v-if="highlightText" class="text-red-600">{{
					highlightText
				}}</span>
			</h2>
			<div
				v-if="showSeparator"
				class="h-1 w-20 bg-red-600 mx-auto rounded-full"
			/>
			<p
				v-if="description"
				:class="['text-gray-500 max-w-lg', center ? 'mx-auto' : '']"
			>
				{{ description }}
			</p>
		</div>
		<NuxtLink
			v-if="linkText && linkTo"
			:to="linkTo"
			class="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-black transition-all shadow-md shadow-red-600/20"
		>
			{{ linkText }}
		</NuxtLink>
	</div>
</template>
