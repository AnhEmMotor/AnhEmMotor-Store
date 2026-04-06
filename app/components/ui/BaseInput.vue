<script setup>
defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: "text",
	},
	placeholder: {
		type: String,
		default: "",
	},
	required: {
		type: Boolean,
		default: false,
	},
	list: {
		type: String,
		default: undefined,
	},
});

defineEmits(["update:modelValue"]);
</script>

<template>
	<div class="space-y-2 group">
		<label
			class="text-[10px] font-black uppercase text-white/50 ml-4 group-hover:text-red-500 transition-colors"
		>
			{{ label }}
		</label>
		<input
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			:required="required"
			:list="list"
			class="w-full h-16 bg-white/5 rounded-2xl border-2 border-white/10 px-6 focus:border-red-600 focus:ring-4 focus:ring-red-600/30 outline-none transition-all font-bold text-lg placeholder:text-white/20 hover:border-white/20"
			@input="$emit('update:modelValue', $event.target.value)"
		>
	</div>
</template>
