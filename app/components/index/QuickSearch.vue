<script setup>
import { ref } from "vue";

const keyword = ref("");

const handleSearch = () => {
	const search = keyword.value.trim();

	navigateTo({
		path: "/products",
		query: {
			page: 1,
			category_ids: 8,
			...(search && { search }),
		},
	});
};
</script>

<template>
	<section class="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
		<div
			class="bg-white rounded-24 shadow-elevated p-5 sm:p-6 flex flex-col gap-6 border border-slate-100"
		>
			<form class="flex flex-col gap-6" @submit.prevent="handleSearch">
				<div class="relative group">
					<Icon
						name="ph:magnifying-glass-bold"
						class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors"
					/>
					<input
						v-model="keyword"
						type="text"
						placeholder="Tên xe..."
						class="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-16 focus:border-primary/30 focus:bg-white outline-none transition-all font-semibold text-slate-800"
					>
				</div>

				<button
					type="submit"
					class="h-14 w-full bg-slate-900 text-white rounded-16 font-bold hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-black/5"
				>
					Tìm kiếm xe ngay
					<Icon name="ph:magnifying-glass-bold" />
				</button>
			</form>
		</div>
	</section>
</template>
