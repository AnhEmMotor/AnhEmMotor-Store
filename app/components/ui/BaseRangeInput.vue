<script setup>
defineProps({
	modelValue: {
		type: Number,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	min: {
		type: Number,
		required: true,
	},
	max: {
		type: Number,
		required: true,
	},
	step: {
		type: Number,
		default: 1,
	},
	displayValue: {
		type: String,
		required: true,
	},
	subLabel: {
		type: String,
		default: "",
	},
});

defineEmits(["update:modelValue"]);

const inputId = useId();
</script>

<template>
	<div class="space-y-4">
		<div class="flex justify-between items-center text-sm font-bold">
			<label :for="inputId" class="text-gray-500 uppercase">{{ label }}</label>
			<span class="text-red-600 text-xl">{{ displayValue }}</span>
		</div>
		<div class="relative flex items-center h-6">
			<input
				:id="inputId"
				:value="modelValue"
				type="range"
				:min="min"
				:max="max"
				:step="step"
				class="w-full h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#e60023]"
				@input="$emit('update:modelValue', Number($event.target.value))"
			>
		</div>
		<p v-if="subLabel" class="text-[10px] text-gray-400 font-medium italic">
			{{ subLabel }}
		</p>
	</div>
</template>
