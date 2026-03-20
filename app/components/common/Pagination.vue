<template>
	<div class="flex justify-center mt-12 md:mt-16">
		<nav
			class="flex items-center space-x-1 rounded-xl bg-gray-50 p-2 shadow-inner"
		>
			<button
				:disabled="currentPage === 1"
				class="px-3 md:px-4 py-2 text-gray-500 hover:text-primary-red hover:bg-white rounded-lg font-medium transition-colors duration-200 flex items-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
				@click="goToPrevious"
			>
				<Icon name="fa6-solid:chevron-left" class="mr-1 md:mr-2 text-xs" />
				<span class="hidden sm:inline">Previous</span>
				<span class="sm:hidden">Trước</span>
			</button>

			<button
				v-for="page in visiblePages"
				:key="page"
				class="px-3 md:px-4 py-2 rounded-lg font-medium transition-colors duration-200"
				:class="
					page === currentPage
						? 'text-white bg-primary-red shadow-md'
						: 'text-gray-700 hover:text-primary-red hover:bg-white'
				"
				@click="goToPage(page)"
			>
				{{ page === "..." ? "..." : page }}
			</button>

			<button
				:disabled="currentPage === totalPages"
				class="px-3 md:px-4 py-2 text-gray-700 hover:text-primary-red hover:bg-white rounded-lg font-medium transition-colors duration-200 flex items-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
				@click="goToNext"
			>
				<span class="hidden sm:inline">Next</span>
				<span class="sm:hidden">Sau</span>
				<Icon name="fa6-solid:chevron-right" class="ml-1 md:ml-2 text-xs" />
			</button>
		</nav>
	</div>
</template>

<script>
export default {
	name: "PaginationComponent",
	props: {
		currentPage: {
			type: Number,
			required: true,
		},
		totalPages: {
			type: Number,
			required: true,
		},
	},
	emits: ["page-change"],
	computed: {
		visiblePages() {
			const pages = [];
			const delta = 1;

			for (let i = 1; i <= this.totalPages; i++) {
				if (
					i === 1 ||
					i === this.totalPages ||
					(i >= this.currentPage - delta && i <= this.currentPage + delta)
				) {
					pages.push(i);
				} else if (pages[pages.length - 1] !== "...") {
					pages.push("...");
				}
			}

			return pages;
		},
	},
	methods: {
		goToPage(page) {
			if (page !== "..." && page !== this.currentPage) {
				this.$emit("page-change", page);
			}
		},
		goToPrevious() {
			if (this.currentPage > 1) {
				this.$emit("page-change", this.currentPage - 1);
			}
		},
		goToNext() {
			if (this.currentPage < this.totalPages) {
				this.$emit("page-change", this.currentPage + 1);
			}
		},
	},
};
</script>
