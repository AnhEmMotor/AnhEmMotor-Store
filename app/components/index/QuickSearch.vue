<script setup>
const searchFilters = reactive({
	keyword: "",
});

const handleSearch = () => {
	const query = {};
	if (searchFilters.keyword.trim()) query.search = searchFilters.keyword.trim();

	navigateTo({
		path: "/products",
		query: query,
	});
};
</script>

<template>
	<section class="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
		<div
			class="bg-white rounded-24 shadow-elevated p-5 sm:p-6 flex flex-col gap-4 border border-slate-100"
		>
			<!-- Search Input (Stretches to full width) -->
			<div class="relative group w-full">
				<Icon
					name="ph:magnifying-glass-bold"
					class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors"
				/>
				<input
					v-model="searchFilters.keyword"
					type="text"
					placeholder="Nhập tên xe bạn muốn tìm... (VD: SH 160i, Winner X...)"
					class="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-16 focus:border-primary/30 focus:bg-white outline-none transition-all font-semibold text-slate-800"
					@keyup.enter="handleSearch"
				>
			</div>

			<!-- Search Button (Full width at bottom) -->
			<button
				class="h-14 w-full bg-slate-900 text-white rounded-16 font-bold hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-black/5"
				@click="handleSearch"
			>
				Tìm kiếm xe ngay
				<Icon name="ph:magnifying-glass-bold" />
			</button>
		</div>
	</section>
</template>
