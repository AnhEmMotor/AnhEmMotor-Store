<script setup>
defineProps({
	benefit: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="flex items-start gap-4 group"
	>
        <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Icon
                :name="benefit.icon"
                class="text-2xl"
            />
        </div>
        <div class="space-y-1">
            <h4 class="font-bold text-base text-slate-900 group-hover:text-primary transition-colors">
                {{ benefit.title }}
            </h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
                {{ benefit.description }}
            </p>
        </div>
	</div>
</template>
