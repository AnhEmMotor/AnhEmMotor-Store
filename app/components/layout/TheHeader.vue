<template>
	<header
		class="fixed top-0 w-full z-[1000] bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
		:class="[isScrolled ? 'shadow-lg' : '']"
	>


		<!-- TẦNG 1: TOP BAR (MINIMAL & COHESIVE) -->
		<div class="h-9 bg-gray-50/50 backdrop-blur-sm border-b border-gray-100 hidden lg:block overflow-hidden">
			<div class="max-w-[1440px] mx-auto px-10 h-full flex items-center justify-between">
				<!-- LEFT: PROMO / BRAND SLOGAN -->
				<div class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
					<p class="text-[9px] font-black text-gray-400 uppercase tracking-[0.25em]">Hệ thống xe máy chính hãng AnhEm Motor</p>
				</div>

				<!-- RIGHT: QUICK LINKS -->
				<div class="flex items-center gap-8 h-full">
					<NuxtLink v-for="item in ['Về AnhEm Motor', 'Tin tức', 'Tuyển dụng', 'Hỗ trợ']" :key="item" to="#" class="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all duration-300 relative group/top">
						{{ item }}
						<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover/top:w-full"></span>
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- TẦNG 2: MAIN HEADER (PREMIUM & INTEGRATED) -->
		<div 
			class="py-3 bg-white/70 backdrop-blur-xl transition-all duration-500 border-b border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]"
			:class="[isScrolled ? 'py-2 bg-white/90 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]' : '']"
		>
			<div class="max-w-[1440px] mx-auto px-10 flex items-center gap-10">
				
				<!-- LOGO (ENHANCED BRANDING) -->
				<NuxtLink to="/" class="flex items-center gap-3 shrink-0 group relative -ml-4 pr-4">

					<!-- Logo Icon with Premium Glow -->
					<div class="relative w-12 h-12 flex items-center justify-center p-0.5 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 group-hover:shadow-[0_0_25px_rgba(230,0,35,0.2)] group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500 z-10">
						<img src="/assets/image/logo.webp" alt="Logo" class="w-full h-full object-cover rounded-full">
					</div>
					
					<!-- Text Branding -->
					<div class="flex flex-col leading-[0.8] transition-transform duration-500 group-hover:translate-x-1">
						<div class="relative overflow-hidden pr-2">
							<span class="text-[22px] font-[1000] text-gray-900 uppercase tracking-[-0.02em] italic block">ANHEM</span>
							<!-- Subtle sweep effect on hover -->
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-sweep"></div>
						</div>

						<span class="text-[11px] font-black text-primary uppercase tracking-[0.45em] mt-0.5">MOTOR</span>
					</div>
				</NuxtLink>

				<!-- NAVIGATION (DYNAMIC & FLOATING) -->
				<nav class="hidden xl:block">
					<ul class="flex items-center gap-6">
						<!-- XE MÁY -->
						<li class="group relative py-2">
							<NuxtLink to="/products?category_ids=1" class="nav-link-refined" :class="{ 'active': isRouteActive('/products?category_ids=1') }">
								XE MÁY
								<span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products?category_ids=1') }"></span>
							</NuxtLink>
							<div class="absolute top-full left-1/2 -translate-x-1/2 w-max max-w-[900px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-50 rounded-[2rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 p-5 z-[100] translate-y-4 group-hover:translate-y-0">
								<div class="flex items-center gap-2">
									<NuxtLink v-for="cat in megaMenuCategories" :key="cat.name" :to="cat.path" class="flex flex-col items-center gap-3 p-5 rounded-[1.5rem] hover:bg-primary/5 group/cat transition-all text-center min-w-[140px]">
										<div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover/cat:bg-white transition-all duration-500 shadow-sm group-hover/cat:shadow-md group-hover/cat:scale-110 group-hover/cat:-rotate-3">
											<Icon :name="cat.icon" class="text-2xl text-gray-400 group-hover/cat:text-primary" />
										</div>
										<div class="flex flex-col">
											<span class="text-[11px] font-black text-gray-900 uppercase tracking-wider group-hover/cat:text-primary transition-colors whitespace-nowrap">{{ cat.name }}</span>
											<span class="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{{ cat.desc }}</span>
										</div>
									</NuxtLink>
								</div>
							</div>
						</li>

						<li><NuxtLink to="/products" class="nav-link-refined" :class="{ 'active': isRouteActive('/products') }">BẢNG GIÁ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products') }"></span></NuxtLink></li>
						<li><NuxtLink to="/promotion" class="nav-link-refined" :class="{ 'active': isRouteActive('/promotion') }">KHUYẾN MÃI <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/promotion') }"></span></NuxtLink></li>
						<li><NuxtLink to="/service" class="nav-link-refined" :class="{ 'active': isRouteActive('/service') }">DỊCH VỤ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/service') }"></span></NuxtLink></li>
						<li><NuxtLink to="/products?category_ids=2,3" class="nav-link-refined" :class="{ 'active': isRouteActive('/products?category_ids=2,3') }">PHỤ TÙNG & PHỤ KIỆN <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/products?category_ids=2,3') }"></span></NuxtLink></li>
						<li><NuxtLink to="/technology" class="nav-link-refined" :class="{ 'active': isRouteActive('/technology') }">CÔNG NGHỆ <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/technology') }"></span></NuxtLink></li>
						<li><NuxtLink to="/compare" class="nav-link-refined" :class="{ 'active': isRouteActive('/compare') }">SO SÁNH XE <span class="nav-dot-floating" :class="{ 'active': isRouteActive('/compare') }"></span></NuxtLink></li>
					</ul>
				</nav>


				<!-- ACTIONS & SEARCH -->
				<div class="flex items-center gap-4 ml-auto">
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
							class="absolute top-full right-0 mt-4 w-[350px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 rounded-2xl p-4 z-[1100] animate-megaSlideIn"
						>
							<div class="relative">
								<Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
								<input 
									type="text" 
									placeholder="Tìm mẫu xe, phụ tùng..."
									class="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 text-xs font-bold focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
									auto-focus
								>
							</div>
						</div>
					</div>

					<!-- PREMIUM CTA GROUP -->
					<div class="flex items-center gap-2 p-1.5 bg-gray-100/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-inner">
						<button 
							class="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:text-primary active:scale-95"
							@click="isTestRideModalOpen = true"
						>
							Lái thử
						</button>
						<button 
							class="px-6 py-2.5 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_-5px_rgba(230,0,35,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_30px_-5px_rgba(230,0,35,0.5)] active:scale-95"
							@click="isQuoteModalOpen = true"
						>
							Báo giá
						</button>
					</div>

					<!-- Auth -->
					<div class="pl-4 border-l border-gray-100">
						<template v-if="authStore.isLoggedIn">

							<div class="relative group">
								<button class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all">
									<div class="w-9 h-9 rounded-full bg-white overflow-hidden border-2 border-primary/10 shadow-sm flex items-center justify-center">
										<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
										<Icon v-else name="lucide:user" class="text-base text-gray-300" />
									</div>
									<Icon name="lucide:chevron-down" class="text-xs text-gray-400 group-hover:text-primary transition-colors" />
								</button>
								
								<!-- Dropdown -->
								<div class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[1100]">
									<div class="px-5 py-2 border-b border-gray-50 mb-2">
										<p class="text-[9px] text-gray-400 uppercase font-black tracking-widest">Khách hàng</p>
										<p class="text-[12px] font-bold text-gray-900 truncate">{{ authStore.user?.fullName }}</p>
									</div>
									<NuxtLink to="/profile" class="flex items-center gap-3 px-5 py-2.5 text-[12px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
										<Icon name="lucide:user" class="text-base" /> Thông tin cá nhân
									</NuxtLink>
									<NuxtLink to="/orders" class="flex items-center gap-3 px-5 py-2.5 text-[12px] font-bold text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
										<Icon name="lucide:shopping-bag" class="text-base" /> Đơn hàng của tôi
									</NuxtLink>
									<div class="h-[1px] bg-gray-50 my-2"></div>
									<button @click="authStore.logout()" class="w-full flex items-center gap-3 px-5 py-2.5 text-[12px] font-black text-red-500 hover:bg-red-50 transition-colors">
										<Icon name="lucide:log-out" class="text-base" /> ĐĂNG XUẤT
									</button>
								</div>
							</div>
						</template>
						<template v-else>
							<NuxtLink to="/login" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
								<Icon name="lucide:log-in" class="text-sm" />
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
				<div v-if="mobileNavActive" class="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm" @click="closeMobileNav" />
				<nav class="fixed top-0 bottom-0 left-0 w-[300px] bg-white z-[2100] transform transition-transform duration-500 ease-in-out shadow-2xl" :class="mobileNavActive ? 'translate-x-0' : '-translate-x-full'">
					<div class="p-8 border-b flex justify-between items-center bg-gray-50/50">
						<div v-if="authStore.isLoggedIn" class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-full bg-white overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
								<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
								<Icon v-else name="lucide:user" class="text-xl text-gray-400" />
							</div>
							<div class="flex flex-col">
								<span class="font-bold text-gray-900 leading-tight">{{ authStore.user?.fullName }}</span>
								<NuxtLink to="/profile" class="text-[10px] font-bold text-[#e60023] uppercase tracking-widest mt-0.5" @click="closeMobileNav">Xem hồ sơ</NuxtLink>
							</div>
						</div>
						<div v-else class="flex flex-col leading-[0.85]">
							<span class="text-xl font-black text-gray-900 uppercase tracking-tighter">ANHEM</span>
							<span class="text-[11px] font-black text-[#e60023] uppercase tracking-[0.35em]">MOTOR</span>
						</div>
						<button @click="closeMobileNav" class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-[#e60023] transition-colors border border-gray-100"><Icon name="fa6-solid:xmark" /></button>
					</div>
					<div class="p-8 space-y-6">
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
import { ref, onBeforeUnmount, computed, watch, onMounted } from "vue";
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

const megaMenuCategories = [
	{ name: 'Tất cả xe', path: '/products?category_ids=1', icon: 'ph:motorcycle-bold', desc: 'Mọi dòng xe' },
	{ name: 'Di chuyển hằng ngày', path: '/products?category_ids=1&search=tay ga', icon: 'ph:city-bold', desc: 'Tiết kiệm & Tiện lợi' },
	{ name: 'Đường trường / Touring', path: '/products?category_ids=1&search=xe so', icon: 'ph:map-trifold-bold', desc: 'Bền bỉ & Thoải mái' },
	{ name: 'Thể thao / Sport', path: '/products?category_ids=1&search=con tay', icon: 'ph:lightning-bold', desc: 'Mạnh mẽ & Tốc độ' },
	{ name: 'Xe Phân Khối Lớn', path: '/products?category_ids=1&search=pkl', icon: 'ph:gauge-bold', desc: 'Đam mê tốc độ' },
];

const megaMenuBrands = [
	{ name: 'Honda', path: '/products?brand=honda', logo: '/assets/image/index/brand/honda.webp' },
	{ name: 'Yamaha', path: '/products?brand=yamaha', logo: '/assets/image/index/brand/yamaha.webp' },
	{ name: 'Suzuki', path: '/products?brand=suzuki', logo: '/assets/image/index/brand/suzuki.webp' },
	{ name: 'Kawasaki', path: '/products?brand=kawasaki', logo: '/assets/image/index/brand/kawasaki.webp' },
];

const megaMenuSuggestions = [
	{ label: 'Hot Deal', title: 'Winner X trả góp 0%', desc: 'Chỉ từ 999k/tháng - Sẵn xe giao ngay', icon: 'fa6-solid:fire', path: '/products' },
	{ label: 'Ưu đãi', title: 'Vario 160 Có Sẵn', desc: 'Hỗ trợ đăng ký biển số trong ngày', icon: 'fa6-solid:bolt-lightning', path: '/products' },
];

const navItemsMobile = [
	{ name: 'XE MÁY', path: '/products?category_ids=1' },
	{ name: 'KHUYẾN MÃI', path: '/promotion' },
	{ name: 'CÔNG NGHỆ', path: '/technology' },
	{ name: 'TIN TỨC', path: '/news' },
	{ name: 'TUYỂN DỤNG', path: '/recruitment' },
];

const openMobileNav = () => { mobileNavActive.value = true; document.body.style.overflow = "hidden"; };
const closeMobileNav = () => { mobileNavActive.value = false; document.body.style.overflow = ""; };

const { cartItems, cartDetails, cartTotal, removeItem, updateQuantity } = useCart();
const toggleCart = () => { isCartOpen.value = !isCartOpen.value; };
const updateCartItemQuantity = (payload) => updateQuantity(payload);
const removeCartItem = (index) => removeItem(index);

if (import.meta.client) {
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 40;
	};

	onMounted(() => { window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll(); });
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



