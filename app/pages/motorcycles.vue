<script setup>
import { ref, reactive, computed } from "vue";
import { useCart } from "~/composables/useCart.js";

useSeoMeta({
	title: "Xe Máy | AnhEm Motor",
	description:
		"Khám phá các dòng xe máy chính hãng tại AnhEm Motor với giá tốt nhất.",
});

const allProducts = ref([
	{
		id: "adv350",
		name: "ADV350",
		price: 165990000,
		image: "/moto/adv350_1.webp",
		type: "xe-ga",
		cc: 330,
		desc: "Mẫu xe tay ga adventure độc đáo, mạnh mẽ và linh hoạt trên mọi địa hình.",
	},
	{
		id: "sh350i",
		name: "SH350i",
		price: 151190000,
		image: "/moto/SH250i.webp",
		type: "xe-ga",
		cc: 330,
		desc: "Biểu tượng của sự sang trọng và đẳng cấp, với động cơ eSP+ mạnh mẽ.",
	},
	{
		id: "sh160i",
		name: "SH160i/125i",
		price: 73921091,
		image: "/moto/SH160i.webp",
		type: "xe-ga",
		cc: 125,
		desc: "Thiết kế châu Âu lịch lãm, công nghệ hiện đại và khả năng vận hành vượt trội.",
	},
	{
		id: "shmode125",
		name: "Sh Mode 125",
		price: 57132000,
		image: "/moto/ShMode.webp",
		type: "xe-ga",
		cc: 125,
		desc: "Sự kết hợp hoàn hảo giữa thời trang và tiện ích, dành cho phái nữ hiện đại.",
	},
	{
		id: "airblade",
		name: "Air Blade 160/125",
		price: 42012000,
		image: "/moto/airblade160.webp",
		type: "xe-ga",
		cc: 125,
		desc: "Thiết kế thể thao, góc cạnh cùng động cơ eSP+ 4 van mạnh mẽ, tiết kiệm nhiên liệu.",
	},
	{
		id: "vario125",
		name: "Vario 125",
		price: 40735637,
		image: "/moto/vario125.webp",
		type: "xe-ga",
		cc: 125,
		desc: "Mẫu xe tay ga thể thao với thiết kế nhỏ gọn, linh hoạt trong đô thị.",
	},
	{
		id: "leadabs",
		name: "Lead ABS",
		price: 39557455,
		image: "/moto/leads.webp",
		type: "xe-ga",
		cc: 125,
		desc: "Mẫu xe tay ga với cốp chứa đồ siêu rộng và các tiện ích vượt trội cho gia đình.",
	},
	{
		id: "supercub",
		name: "Super Cub C125",
		price: 86292000,
		image: "/moto/cupc125.webp",
		type: "xe-so",
		cc: 124,
		desc: "Huyền thoại trở lại với thiết kế hoài cổ và công nghệ hiện đại.",
	},
	{
		id: "future125",
		name: "Future 125 FI",
		price: 30524727,
		image: "/moto/Future125.webp",
		type: "xe-so",
		cc: 125,
		desc: "Mẫu xe số cao cấp, bền bỉ, tiết kiệm nhiên liệu và thiết kế sang trọng.",
	},
	{
		id: "wavealpha",
		name: "Wave Alpha cổ điển",
		price: 18939273,
		image: "/moto/wave alpha.webp",
		type: "xe-so",
		cc: 110,
		desc: "Mẫu xe số quốc dân, bền bỉ và tiết kiệm nhiên liệu, nay có phiên bản cổ điển.",
	},
	{
		id: "blade",
		name: "Blade",
		price: 18900000,
		image: "/moto/blade.webp",
		type: "xe-so",
		cc: 110,
		desc: "Thiết kế thể thao, nhỏ gọn, phù hợp với giới trẻ năng động.",
	},
	{
		id: "exciter",
		name: "Exciter",
		price: 45800000,
		image: "/moto/exciter.webp",
		type: "xe-con-tay",
		cc: 155,
		desc: '"Ông vua đường phố" với động cơ 155 VVA mạnh mẽ và thiết kế thể thao.',
	},
	{
		id: "sirius",
		name: "Sirius FI",
		price: 21208000,
		image: "/moto/siriusFI.webp",
		type: "xe-so",
		cc: 115,
		desc: "Mẫu xe số phổ thông bền bỉ, tiết kiệm xăng của Yamaha.",
	},
	{
		id: "goldwing",
		name: "Gold Wing 2025",
		price: 1231500000,
		image: "/moto/gold.webp",
		type: "xe-the-thao",
		cc: 1833,
		desc: "Mẫu xe touring hạng sang, biểu tượng của sự sang trọng và công nghệ đỉnh cao.",
	},
	{
		id: "cbr1000",
		name: "CBR1000RR-R Fireblade SP 2024",
		price: 1051000000,
		image: "/moto/CBR1000RR.webp",
		type: "xe-the-thao",
		cc: 1000,
		desc: "Siêu phẩm Sportbike, được phát triển từ công nghệ của đường đua MotoGP.",
	},
	{
		id: "africatwin_sport",
		name: "Africa Twin 2025 - Bản Adventure Sports",
		price: 620990000,
		image: "/moto/africatwin.webp",
		type: "xe-the-thao",
		cc: 1084,
		desc: "Mẫu xe Adventure đầu bảng, sẵn sàng chinh phục mọi cung đường off-road.",
	},
	{
		id: "africatwin_std",
		name: "Africa Twin 2025 – Bản Tiêu chuẩn",
		price: 540990000,
		image: "/moto/africatc.webp",
		type: "xe-the-thao",
		cc: 1084,
		desc: "Phiên bản tiêu chuẩn của huyền thoại Adventure, linh hoạt và mạnh mẽ.",
	},
	{
		id: "cb1000r",
		name: "CB1000R 2023",
		price: 510500000,
		image: "/moto/CBR10002023.webp",
		type: "xe-the-thao",
		cc: 998,
		desc: "Thiết kế Neo Sports Café độc đáo, kết hợp giữa cổ điển và hiện đại.",
	},
	{
		id: "rabel1100",
		name: "Rabel 1100 2025",
		price: 399990000,
		image: "/moto/Rabell 1100.webp",
		type: "xe-the-thao",
		cc: 1084,
		desc: "Mẫu xe Cruiser mạnh mẽ với động cơ từ Africa Twin, mang lại trải nghiệm lái phấn khích.",
	},
	{
		id: "cb1000hornet",
		name: "CB1000 Hornet",
		price: 339900000,
		image: "/moto/CB1000 Hornet.webp",
		type: "xe-the-thao",
		cc: 999,
		desc: 'Sự trở lại của "ong bắp cày" với thiết kế hầm hố và hiệu suất vượt trội.',
	},
	{
		id: "cbr650r",
		name: "CBR650R 2024",
		price: 264990000,
		image: "/moto/CBR650R.webp",
		type: "xe-the-thao",
		cc: 649,
		desc: "Thiết kế Sportbike thể thao, âm thanh động cơ 4 xi-lanh đầy uy lực.",
	},
	{
		id: "cbr500r",
		name: "CBR500R 2024",
		price: 192990000,
		image: "/moto/CBR500R.webp",
		type: "xe-the-thao",
		cc: 471,
		desc: "Mẫu xe Sport tầm trung, phù hợp cho người mới chơi xe phân khối lớn.",
	},
	{
		id: "cb500hornet",
		name: "CB500 Hornet",
		price: 184990000,
		image: "/moto/CB1000 Hornet.webp",
		type: "xe-the-thao",
		cc: 471,
		desc: "Thiết kế Streetlight hầm hố, thừa hưởng DNA từ CB1000 Hornet.",
	},
	{
		id: "cl500",
		name: "CL500",
		price: 180990000,
		image: "/moto/CL500.webp",
		type: "xe-the-thao",
		cc: 471,
		desc: "Phong cách Scrambler cổ điển, dễ dàng tùy biến theo cá tính riêng.",
	},
	{
		id: "cbr150r",
		name: "CBR150R",
		price: 72290000,
		image: "/moto/CBR150R.webp",
		type: "xe-con-tay",
		cc: 149,
		desc: "Mẫu xe Sportbike 150cc, thiết kế lấy cảm hứng từ các đàn anh phân khối lớn.",
	},
	{
		id: "winnerr",
		name: "Winner R",
		price: 46160000,
		image: "/moto/Winner.webp",
		type: "xe-con-tay",
		cc: 150,
		desc: "Mẫu xe côn tay thể thao, hiệu suất cao và trang bị phanh ABS an toàn.",
	},
	{
		id: "vstrom250",
		name: "V-STROM 250",
		price: 132900000,
		image: "/moto/V-Storm.webp",
		type: "xe-con-tay",
		cc: 248,
		desc: "Mẫu xe Adventure cỡ nhỏ của Suzuki, bền bỉ và đa dụng.",
	},
	{
		id: "satria",
		name: "SATRIA F150",
		price: 53490000,
		image: "/moto/Satria.webp",
		type: "xe-con-tay",
		cc: 147,
		desc: "Mẫu xe Hyper Underdone với tốc độ và khả năng tăng tốc ấn tượng.",
	},
	{
		id: "icone",
		name: "ICON E",
		price: 26803637,
		image: "/moto/ICON.webp",
		type: "xe-dien",
		cc: 0,
		desc: "Mẫu xe máy điện với thiết kế thời trang, nhỏ gọn và thân thiện môi trường.",
	},
	{
		id: "neos",
		name: "NEO'S",
		price: 49091637,
		image: "/moto/NEO.webp",
		type: "xe-dien",
		cc: 0,
		desc: "Xe điện Yamaha với thiết kế hiện đại, pin có thể tháo rời tiện lợi.",
	},
]);

const { addItem: addItemToCart } = useCart();

const filters = reactive({
	types: [],
	ccs: [],
	minPrice: 0,
	maxPrice: 1300000000,
});
const currentPage = ref(1);
const productsPerPage = 12;
const isFilterSidebarOpen = ref(false);

const filteredProducts = computed(() => {
	return allProducts.value.filter((product) => {
		const typeMatch =
			filters.types.length === 0 || filters.types.includes(product.type);
		const priceMatch =
			product.price >= filters.minPrice && product.price <= filters.maxPrice;
		const ccMatch =
			filters.ccs.length === 0 ||
			filters.ccs.some((range) => {
				if (range === "<125") return product.cc > 0 && product.cc < 125;
				if (range === "125-150") return product.cc >= 125 && product.cc <= 150;
				if (range === "150-250") return product.cc > 150 && product.cc <= 250;
				if (range === ">250") return product.cc > 250;
				return false;
			});
		return typeMatch && priceMatch && ccMatch;
	});
});

const totalPages = computed(() =>
	Math.ceil(filteredProducts.value.length / productsPerPage),
);

const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * productsPerPage;
	return filteredProducts.value.slice(start, start + productsPerPage);
});

const addToCart = (product) => {
	addItemToCart(product, 1);
};

const applyFilters = (newFilters) => {
	filters.types = newFilters.types;
	filters.ccs = newFilters.ccs;
	filters.minPrice = newFilters.minPrice;
	filters.maxPrice = newFilters.maxPrice;
	currentPage.value = 1;
};

const handlePageChange = (newPage) => {
	currentPage.value = newPage;
	window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleFilterSidebar = (state) => {
	isFilterSidebarOpen.value = state;
	document.body.classList.toggle("filter-open", state);
};
</script>

<template>
	<div class="motorcycles-page">
		<div
			v-if="isFilterSidebarOpen"
			class="fixed inset-0 bg-black/50 z-40 lg:hidden"
			@click="toggleFilterSidebar(false)"
		/>

		<MotorcyclesFilterSidebarMobile
			:is-open="isFilterSidebarOpen"
			@update-filters="applyFilters"
			@close="toggleFilterSidebar(false)"
		/>

		<main
			class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex gap-4 sm:gap-6 py-8 sm:py-6"
		>
			<aside class="hidden lg:block w-72 flex-shrink-0">
				<MotorcyclesFilterSidebar
					:is-open="true"
					@update-filters="applyFilters"
					@close="toggleFilterSidebar(false)"
				/>
			</aside>

			<div class="flex-1 min-w-0">
				<div class="flex items-center justify-between mt-4 sm:mt-0">
					<h1
						class="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-4 sm:mb-6 w-full"
					>
						Sản Phẩm Xe Máy
					</h1>
					<button
						id="mobile-filter-toggle"
						class="ml-4 lg:hidden bg-gray-800 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-gray-900 text-sm sm:text-base"
						@click="toggleFilterSidebar(true)"
					>
						<i class="fas fa-filter" /> Lọc
					</button>
				</div>

				<MotorcyclesProductList
					:products="paginatedProducts"
					@add-to-cart="addToCart"
				/>
				<div class="mt-6">
					<UiBasePagination
						:current-page="currentPage"
						:total-pages="totalPages"
						@update:current-page="handlePageChange"
					/>
				</div>
			</div>
		</main>
	</div>
</template>
