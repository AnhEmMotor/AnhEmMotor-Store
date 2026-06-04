<template>
	<header
		class="fixed top-0 w-full z-1000 bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
		:class="[isScrolled ? 'shadow-lg' : '']"
	>


		<!-- TẦNG 1: TOP BAR (MINIMAL & COHESIVE) -->
		<div class="h-9 bg-gray-50/50 backdrop-blur-sm border-b border-gray-100 hidden lg:block overflow-hidden">
		<div class="max-w-360 mx-auto px-10 h-full flex items-center justify-between">
				<!-- LEFT: PROMO / BRAND SLOGAN -->
				<div class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
					<p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em]">Hệ thống xe máy chính hãng AnhEm Motor</p>
				</div>

				<!-- RIGHT: QUICK LINKS -->
				<div class="flex items-center gap-6 h-full">
					<!-- PREMIUM GLOWING APP LINK -->
					<NuxtLink 
						to="/app" 
						class="text-[9px] font-[1000] uppercase tracking-widest text-white px-3 py-1 bg-linear-to-r from-red-600 to-red-800 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 relative z-10 shrink-0 font-sans"
					>
						AnhEmMoto App
						<span class="relative flex h-1.5 w-1.5 flex-shrink-0">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"/>
							<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"/>
						</span>
					</NuxtLink>

					<!-- OTHER QUICK LINKS -->
					<NuxtLink
v-for="item in [
						{ name: 'Về AnhEm Motor', path: '/about' },
						{ name: 'Tin tức', path: '/news' },
						{ name: 'Tuyển dụng', path: '/recruitment' },
						{ name: 'Hỗ trợ', path: '/support' }
					]" :key="item.name" :to="item.path" class="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all duration-300 relative group/top flex items-center gap-1" :class="{ 'text-primary font-black': isRouteActive(item.path) }">
						{{ item.name }}
						<span class="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] bg-primary transition-all duration-300" :class="isRouteActive(item.path) ? 'w-full' : 'w-0 group-hover/top:w-full'"/>
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- TẦNG 2: MAIN HEADER (PREMIUM & INTEGRATED) -->
		<div 
			class="py-2 sm:py-3 bg-white/70 backdrop-blur-xl transition-all duration-500 border-b border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]"
			:class="[isScrolled ? 'py-1.5 sm:py-2 bg-white/90 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]' : '']"
		>
			<div class="max-w-360 mx-auto px-3 sm:px-4 lg:px-10 flex items-center gap-2 sm:gap-6">
				
				<!-- Mobile Menu Toggle (Moved to Left) -->
				<button
					class="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full text-gray-900 hover:bg-gray-100 transition-all shrink-0 group"
					aria-label="Mở menu"
					@click="openMobileNav"
				>
					<span class="w-6 h-0.5 bg-gray-950 rounded-full transition-all group-hover:bg-primary"/>
					<span class="w-6 h-0.5 bg-gray-950 rounded-full transition-all group-hover:bg-primary"/>
					<span class="w-6 h-0.5 bg-gray-950 rounded-full transition-all group-hover:bg-primary"/>
				</button>

				<!-- LOGO (ENHANCED BRANDING) -->
				<NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 shrink-0 group relative ">

					<!-- Logo Icon with Premium Glow -->
					<div class="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-0.5 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 group-hover:shadow-[0_0_25px_rgba(230,0,35,0.2)] group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500 z-10">
						<img src="/assets/image/logo.webp" alt="Logo" class="w-full h-full object-cover rounded-full">
					</div>
					
					<!-- Text Branding (Always visible on mobile now) -->
					<div class="flex flex-col leading-[0.8] transition-transform duration-500 group-hover:translate-x-1 header-text-brand">
						<div class="relative overflow-hidden pr-2">
							<span class="text-[18px] sm:text-[22px] font-[1000] text-gray-950 uppercase tracking-[-0.04em] italic block">AnhEm</span>
							<!-- Subtle sweep effect on hover -->
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-sweep"/>
						</div>

						<span class="text-[10px] sm:text-[11px] font-black text-red-600 uppercase tracking-[0.45em] mt-0.5">Motor</span>
					</div>
				</NuxtLink>

				<!-- NAVIGATION (DYNAMIC & FLOATING) -->
				<nav class="hidden xl:block">
					<ul class="flex items-center gap-4">
						<!-- XE MÁY -->
						<li class="group relative py-2">
							<NuxtLink to="/products?category_ids=8" class="nav-link-refined" :class="{ 'active': isRouteActive('/products?category_ids=8') }">
								XE MÁY
								<span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products?category_ids=8') }"/>
							</NuxtLink>
							<div class="absolute top-full -left-5 w-max max-w-225 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-50 rounded-4xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 p-5 z-100 translate-y-4 group-hover:translate-y-0">
								<div class="flex items-center gap-2">
									<NuxtLink v-for="cat in dynamicMotorcycleCategories" :key="cat.name" :to="cat.path" class="flex flex-col items-center gap-3 p-5 rounded-[1.5rem] hover:bg-primary/5 group/cat transition-all text-center min-w-35">
										<div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover/cat:bg-white transition-all duration-500 shadow-sm group-hover/cat:shadow-md group-hover/cat:scale-110 group-hover/cat:-rotate-3">
											<Icon :name="getCategoryIcon(cat)" class="text-2xl text-gray-400 group-hover/cat:text-primary" />
										</div>
										<div class="flex flex-col">
											<span class="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-wider group-hover/cat:text-primary transition-colors whitespace-nowrap">{{ cat.name }}</span>
											<span class="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{{ getCategoryDesc(cat) }}</span>
										</div>
									</NuxtLink>
								</div>
							</div>
						</li>
						<li><NuxtLink to="/products" class="nav-link-refined" :class="{ 'active': isRouteActive('/products') }">BẢNG GIÁ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products') }"/></NuxtLink></li>
						<li><NuxtLink to="/promotion" class="nav-link-refined" :class="{ 'active': isRouteActive('/promotion') }">KHUYẾN MÃI <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/promotion') }"/></NuxtLink></li>
						<li><NuxtLink to="/service" class="nav-link-refined" :class="{ 'active': isRouteActive('/service') }">DỊCH VỤ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/service') }"/></NuxtLink></li>
						<li><NuxtLink to="/products?category_ids=12,13" class="nav-link-refined" :class="{ 'active': isRouteActive('/products?category_ids=12,13') }">PHỤ TÙNG & PHỤ KIỆN<span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products?category_ids=12,13') }"/></NuxtLink></li>
						<li><NuxtLink to="/compare" class="nav-link-refined" :class="{ 'active': isRouteActive('/compare') }">SO SÁNH XE <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/compare') }"/></NuxtLink></li>
						
						<!-- KHÁM PHÁ -->
						<li><NuxtLink to="/technology" class="nav-link-refined" :class="{ 'active': isRouteActive('/technology') }">CÔNG NGHỆ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/technology') }"/></NuxtLink></li>

					</ul>
				</nav>


				<!-- ACTIONS & MOBILE MENU -->
				<div class="flex items-center gap-2 sm:gap-4 ml-auto">
					<!-- Search Toggle -->
					<div class="relative">
						<button 
							class="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-all"
							:class="{ 'text-primary bg-primary/5': isSearchOpen }"
							@click="isSearchOpen = !isSearchOpen"
						>
							<Icon :name="isSearchOpen ? 'lucide:x' : 'lucide:search'" class="w-5 h-5" />
						</button>

						<!-- Search Dropdown (Refined) -->
						<div 
							v-if="isSearchOpen"
							class="absolute top-full right-0 mt-4 w-[300px] sm:w-87.5 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 rounded-2xl p-4 z-1100 animate-megaSlideIn"
						>
							<div class="relative">
								<Icon name="ph:magnifying-glass-fill" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
								<input 
									type="text" 
									placeholder="Tìm mẫu xe, phụ tùng..."
									class="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 text-xs font-bold focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
									auto-focus
								>
							</div>
						</div>
					</div>

					<!-- PREMIUM CTA GROUP (Hidden on mobile for better space) -->
					<div class="hidden lg:flex items-center gap-2 p-1.5 bg-gray-100/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-inner">
						<NuxtLink 
							to="/test-drive"
							class="px-3 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:text-primary active:scale-95"
						>
							Lái thử
						</NuxtLink>
						<NuxtLink 
							to="/feedback"
							class="px-3 sm:px-6 py-2 sm:py-2.5 bg-primary text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_-5px_rgba(230,0,35,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_30px_-5px_rgba(230,0,35,0.5)] active:scale-95"
						>
							Góp ý
						</NuxtLink>
					</div>

					<!-- Auth -->
					<div class="pl-2 sm:pl-4 border-l border-gray-100">
						<template v-if="authStore.isLoggedIn">

							<div class="relative group">
								<button class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all">
									<div class="w-9 h-9 rounded-full bg-white overflow-hidden border-2 border-primary/10 shadow-sm flex items-center justify-center">
										<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
										<Icon v-else name="ph:user-fill" class="text-base text-gray-300" />
									</div>
									<Icon name="ph:caret-down-fill" class="text-xs text-gray-400 group-hover:text-primary transition-colors" />
								</button>
								
								<!-- Dropdown -->
								<div class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-1100">
									<div class="px-5 py-2 border-b border-gray-50 mb-2">
										<p class="text-[9px] text-gray-400 uppercase font-black tracking-widest">Khách hàng</p>
										<p class="text-[12px] font-bold text-gray-900 truncate">{{ authStore.user?.fullName }}</p>
									</div>
									<NuxtLink to="/profile" class="flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
										<Icon name="ph:user-fill" class="text-base" /> Thông tin cá nhân
									</NuxtLink>
									<NuxtLink to="/orders" class="flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
										<Icon name="ph:shopping-bag-fill" class="text-base" /> Đơn hàng của tôi
									</NuxtLink>
									<div class="h-[1px] bg-gray-50 my-2"/>
									<button class="w-full flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] font-black text-red-500 hover:bg-red-50 transition-colors" @click="authStore.logout()">
										<Icon name="ph:sign-out-fill" class="text-base" /> ĐĂNG XUẤT
									</button>
								</div>
							</div>
						</template>
						<template v-else>
							<NuxtLink to="/login" class="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gray-900 text-white font-black text-xs sm:text-[11px] uppercase tracking-widest hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
								<Icon name="ph:sign-in-fill" class="text-sm" />
								Đăng nhập
							</NuxtLink>
						</template>
					</div>
				</div>
			</div>
		</div>

		<!-- MOBILE MENU -->

		<ClientOnly>
			<Teleport to="body">
				<div v-if="mobileNavActive" class="fixed inset-0 z-2000 bg-black/40 backdrop-blur-sm" @click="closeMobileNav" />
				<nav class="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm bg-white z-2100 transform transition-transform duration-500 ease-in-out shadow-2xl" :class="mobileNavActive ? 'translate-x-0' : '-translate-x-full'">
					<div class="p-4 sm:p-8 border-b flex justify-between items-center bg-gray-50/50">
						<div v-if="authStore.isLoggedIn" class="flex items-center gap-4">
							<div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
								<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
								<div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
								</div>
							</div>
							<div class="flex flex-col">
								<NuxtLink to="/profile" class="text-[10px] font-black text-[#e60023] uppercase tracking-[0.2em]" @click="closeMobileNav">Xem hồ sơ</NuxtLink>
								<span class="font-black text-gray-950 text-base leading-tight mt-1">{{ authStore.user?.fullName || 'Khách hàng' }}</span>
							</div>
						</div>
						<div v-else class="flex flex-col leading-[0.85]">
							<span class="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tighter">ANHEM</span>
							<span class="text-[10px] sm:text-[11px] font-black text-[#e60023] uppercase tracking-[0.35em]">MOTOR</span>
						</div>
						<button class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition-all border border-gray-100 group active:scale-95" aria-label="Đóng menu" @click="closeMobileNav">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;" class="group-hover:stroke-red-600 transition-colors">
								<line x1="18" y1="6" x2="6" y2="18"/>
								<line x1="6" y1="6" x2="18" y2="18"/>
							</svg>
						</button>
					</div>
					<div class="p-4 sm:p-8 space-y-4 sm:space-y-6">
						<!-- Auth Buttons for Mobile -->
						<div v-if="!authStore.isLoggedIn" class="grid grid-cols-2 gap-3 mb-8">
							<NuxtLink to="/login" class="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 text-white font-bold text-xs uppercase tracking-widest" @click="closeMobileNav">
								Đăng nhập
							</NuxtLink>
							<NuxtLink to="/register" class="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-widest" @click="closeMobileNav">
								Đăng ký
							</NuxtLink>
						</div>
						<NuxtLink v-for="item in navItemsMobile" :key="item.path" :to="item.path" class="block py-3 font-bold text-gray-900 border-b border-gray-50 last:border-0" @click="closeMobileNav">
							{{ item.name }}
						</NuxtLink>
					</div>
				</nav>
			</Teleport>
		</ClientOnly>

		<ClientOnly>
			<CartPanel :is-open="isCartOpen" :cart-items="cartDetails" :cart-total="cartTotal" @close="toggleCart" @update-quantity="updateCartItemQuantity" @remove-item="removeCartItem" />
			<QuickActionModal :is-open="isTestRideModalOpen" @close="isTestRideModalOpen = false">
				<TestRideForm @close="isTestRideModalOpen = false" />
			</QuickActionModal>
			<QuickActionModal :is-open="isQuoteModalOpen" @close="isQuoteModalOpen = false">
				<ContactForm :is-submitting="contactStore.isSubmitting" :status-message="contactStore.statusMessage" :status-type="contactStore.statusType" @submit="handleContactSubmit" />
			</QuickActionModal>
		</ClientOnly>
	</header>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, onMounted } from "vue";
import CartPanel from "../cart/CartPanel.vue";
import QuickActionModal from "../common/QuickActionModal.vue";
import TestRideForm from "../service/TestRideForm.vue";
import ContactForm from "../contact/ContactForm.vue";



const authStore = useAuthStore();
const contactStore = useContactStore();

const isScrolled = ref(false);

const mobileNavActive = ref(false);
const isSearchOpen = ref(false);
const isCartOpen = ref(false);
const isTestRideModalOpen = ref(false);
const isQuoteModalOpen = ref(false);

const route = useRoute();
const isRouteActive = (targetPath) => {
	if (targetPath === '/') return route.path === '/';
	
	// Exact match for paths with query strings (like category filters)
	if (targetPath.includes('?')) {
		return route.fullPath === targetPath;
	}
	
	// Path-only match for base routes (prevents /products matching /products?category_ids=1)
	return route.path === targetPath && Object.keys(route.query).length === 0;
};




const handleContactSubmit = async (data) => {
	const { resetForm, ...formData } = data;
	const success = await contactStore.submitContact(formData);
	if (success && resetForm) { setTimeout(() => { isQuoteModalOpen.value = false; resetForm(); }, 2000); }
};

const categoryStore = useCategoryStore();
const dynamicMotorcycleCategories = computed(() => {
	const allCats = Array.isArray(categoryStore.categories) ? categoryStore.categories : [];
	// Filter for children of Motorcycle (ID 8)
	const subCats = allCats.filter(c => c.parentId === 8 || c.id === 8);
	
	// Ensure "Tất cả xe" is first if it's the parent
	return subCats.map(c => ({
		...c,
		name: c.id === 8 ? 'Tất cả xe' : c.name,
		path: `/products?category_ids=${c.id}`
	})).sort((a) => a.id === 8 ? -1 : 1);
});

const getCategoryIcon = (cat) => {
	if (cat.id === 8) return 'ph:motorcycle-bold';
	if (cat.name.toLowerCase().includes('ga')) return 'ph:city-bold';
	if (cat.name.toLowerCase().includes('số')) return 'ph:map-trifold-bold';
	if (cat.name.toLowerCase().includes('côn')) return 'ph:lightning-bold';
	return 'ph:gauge-bold';
};

const getCategoryDesc = (cat) => {
	if (cat.id === 8) return 'Mọi dòng xe';
	if (cat.name.toLowerCase().includes('ga')) return 'Tiết kiệm & Tiện lợi';
	if (cat.name.toLowerCase().includes('số')) return 'Bền bỉ & Thoải mái';
	if (cat.name.toLowerCase().includes('côn')) return 'Mạnh mẽ & Tốc độ';
	return 'Chính hãng AnhEm';
};

const navItemsMobile = [
		{ name: 'TRANG CHỦ', path: '/' },
		{ name: 'XE MÁY', path: '/products?category_ids=8' },
		{ name: 'BẢNG GIÁ', path: '/products' },
		{ name: 'KHUYẾN MÃI', path: '/promotion' },
		{ name: 'DỊCH VỤ', path: '/service' },
		{ name: 'PHỤ TÙNG & PHỤ KIỆN', path: '/products?category_ids=12,13' },
		{ name: 'SO SÁNH XE', path: '/compare' },
		{ name: 'CÔNG NGHỆ', path: '/technology' },
		{ name: 'TIN TỨC', path: '/news' },
		{ name: 'TUYỂN DỤNG', path: '/recruitment' },
];

const openMobileNav = () => { mobileNavActive.value = true; document.body.style.overflow = "hidden"; };
const closeMobileNav = () => { mobileNavActive.value = false; document.body.style.overflow = ""; };

const { cartDetails, cartTotal, removeItem, updateQuantity } = useCart();
const toggleCart = () => { isCartOpen.value = !isCartOpen.value; };
const updateCartItemQuantity = (payload) => updateQuantity(payload);
const removeCartItem = (index) => removeItem(index);

if (import.meta.client) {
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 40;
	};

	onMounted(async () => { 
		window.addEventListener("scroll", handleScroll, { passive: true }); 
		handleScroll(); 
		// Fetch all categories from API for the mega menu
		const data = await categoryStore.getProductCategories();
		categoryStore.categories = data;
	});
	onBeforeUnmount(() => { window.removeEventListener("scroll", handleScroll); });
}
</script>

<style scoped>
@reference "../../assets/main.css";

/* REFINED NAVIGATION */
.nav-link-refined {
	@apply relative flex items-center text-[12px] font-black text-gray-900 transition-all duration-300 cursor-pointer uppercase tracking-widest px-1 whitespace-nowrap;
}


.nav-link-refined:hover,
.nav-link-refined.active {
	@apply text-primary;
}

.nav-dot-floating {
	@apply absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300;
}

.nav-link-refined:hover .nav-dot-floating,
.nav-link-refined.active .nav-dot-floating {
	@apply w-full;
}


.mega-menu {
	animation: megaSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes megaSlideIn {
	from { opacity: 0; transform: translateY(10px); }
	to { opacity: 1; transform: translateY(0); }
}

.group:hover .animate-sweep {
	animation: sweep 0.8s ease-in-out;
}

@keyframes sweep {
	from { transform: translateX(-100%); }
	to { transform: translateX(100%); }
}
</style>



