<script setup>
import { reactive } from "vue";

const searchFilters = reactive({
	keyword: "",
	brand: "",
	type: "",
	priceRange: "",
});

const handleSearch = () => {
	const query = {};
	if (searchFilters.keyword.trim()) query.search = searchFilters.keyword.trim();
	if (searchFilters.brand) query.brand = searchFilters.brand;
	if (searchFilters.type) query.type = searchFilters.type;
	if (searchFilters.priceRange) query.price = searchFilters.priceRange;

	navigateTo({
		path: "/products",
		query: query,
	});
};
</script>

<template>
	<section class="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
		<div
			class="bg-white rounded-24 shadow-elevated p-5 sm:p-6 flex flex-col gap-6 border border-slate-100"
		>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div class="relative group">
					<Icon
						name="ph:magnifying-glass-bold"
						class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors"
					/>
					<input
						v-model="searchFilters.keyword"
						type="text"
						placeholder="Tên xe..."
						class="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-16 focus:border-primary/30 focus:bg-white outline-none transition-all font-semibold text-slate-800"
						@keyup.enter="handleSearch"
					>
				</div>

				<div class="relative">
					<select
						v-model="searchFilters.brand"
						class="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-16 outline-none appearance-none font-semibold text-slate-800 cursor-pointer focus:border-primary/30"
					>
						<option value="">Tất cả hãng</option>
						<option value="honda">Honda</option>
						<option value="yamaha">Yamaha</option>
						<option value="suzuki">Suzuki</option>
					</select>
					<Icon name="ph:caret-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
				</div>

				<div class="relative">
					<select
						v-model="searchFilters.type"
						class="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-16 outline-none appearance-none font-semibold text-slate-800 cursor-pointer focus:border-primary/30"
					>
						<option value="">Loại xe</option>
						<option value="tay-ga">Xe tay ga</option>
						<option value="xe-so">Xe số</option>
						<option value="con-tay">Xe côn tay</option>
					</select>
					<Icon name="ph:caret-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
				</div>

				<div class="relative">
					<select
						v-model="searchFilters.priceRange"
						class="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-16 outline-none appearance-none font-semibold text-slate-800 cursor-pointer focus:border-primary/30"
					>
						<option value="">Khoảng giá</option>
						<option value="0-30">Dưới 30 triệu</option>
						<option value="30-60">30 - 60 triệu</option>
						<option value="60-100">60 - 100 triệu</option>
						<option value="100+">Trên 100 triệu</option>
					</select>
					<Icon name="ph:caret-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
				</div>
			</div>

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
