<template>
	<div class="flex items-center gap-2">
		<button
			class="w-8 h-8 rounded-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"
			:disabled="disabled || value <= min"
			@click="decrement"
		>
			<Icon name="fa6-solid:minus" class="text-[10px]" />
		</button>
		<span class="font-bold text-sm min-w-[24px] text-center">{{ value }}</span>
		<button
			class="w-8 h-8 rounded-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"
			:disabled="disabled || value >= max"
			@click="increment"
		>
			<Icon name="fa6-solid:plus" class="text-[10px]" />
		</button>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	modelValue: { type: Number, default: 1 },
	min: { type: Number, default: 1 },
	max: { type: Number, default: 999 },
	disabled: { type: Boolean, default: false },
});

const emits = defineEmits(["update:modelValue", "increment", "decrement"]);

const value = computed(() => props.modelValue);

function increment() {
	if (props.disabled || props.modelValue >= props.max) return;
	const next = props.modelValue + 1;
	emits("update:modelValue", next);
	emits("increment");
}

function decrement() {
	if (props.disabled || props.modelValue <= props.min) return;
	const next = props.modelValue - 1;
	emits("update:modelValue", next);
	emits("decrement");
}
</script>
