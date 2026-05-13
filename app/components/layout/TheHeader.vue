<template>
	<header
		class="fixed top-0 w-full z-[1000] bg-white transition-all duration-300 border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
		:class="[isScrolled ? 'shadow-lg' : '']"
	>
		<!-- TẦNG 1: TOP BAR (MINI - DISCREET) -->
		<div class="h-10 bg-white border-b border-gray-50 overflow-hidden hidden lg:block">
			<div class="max-w-[1440px] mx-auto px-10 h-full grid grid-cols-3 items-center">
				<!-- LEFT: QUICK SEARCH (PROFESSIONAL MINIMALIST) -->
				<div class="col-span-1">
					<div class="relative w-[320px] group flex items-center">
						<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
							<Icon name="lucide:search" class="w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#e60023] transition-colors duration-300" />
						</div>
						<input 
							type="text" 
							placeholder="Tìm kiếm sản phẩm..."
							class="block w-full bg-slate-100/50 hover:bg-slate-100 border-none rounded-lg py-1 pl-10 pr-10 text-[11px] font-medium placeholder:text-slate-400 text-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-200 transition-all duration-300"
						>
						<div class="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
							<span class="flex items-center justify-center w-4 h-4 border border-slate-200 rounded bg-white text-[8px] font-bold text-slate-300 shadow-sm transition-all group-focus-within:opacity-0">/</span>
						</div>
					</div>
				</div>

				<!-- CENTER: PROMO MESSAGE OR EMPTY -->
				<div class="col-span-1 flex justify-center">
					<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Hệ thống xe máy chính hãng AnhEm Motor</p>
				</div>

				<!-- RIGHT LINKS -->
				<div class="col-span-1 flex justify-end">
					<div class="flex items-center gap-6 text-[10px] font-medium text-slate-400 uppercase tracking-widest whitespace-nowrap">
						<NuxtLink to="/about" class="hover:text-gray-900 transition-all">Về AnhEm Motor</NuxtLink>
						<NuxtLink to="/news" class="hover:text-gray-900 transition-all">Tin tức</NuxtLink>
						<NuxtLink to="/recruitment" class="hover:text-gray-900 transition-all">Tuyển dụng</NuxtLink>
						<NuxtLink to="/contact" class="hover:text-gray-900 transition-all">Câu hỏi thường gặp</NuxtLink>
					</div>
				</div>
			</div>
		</div>

		<!-- TẦNG 2: MAIN HEADER (PREMIUM BREATHABLE) -->
		<div class="py-[14px] bg-white">
			<div class="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
				<!-- LOGO (CIRCULAR ICON + REFINED TYPO) -->
				<div class="flex items-center gap-8 shrink-0">
					<NuxtLink to="/" class="flex items-center gap-4 group relative -top-[5px]" active-class="" exact-active-class="active-underline">
						<div class="w-12 h-12 flex items-center justify-center transition-all duration-500">
							<img src="/assets/image/logo.webp" alt="Logo" class="w-full h-full object-cover rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-all duration-300">
						</div>
						<span class="text-xl font-bold text-[#111] uppercase tracking-[1px]">ANHEM MOTOR</span>
					</NuxtLink>

					<!-- NAVIGATION (STRONG HIERARCHY & FOCUS) -->
					<nav class="hidden xl:flex items-center">
						<ul class="flex items-center gap-5">
							<!-- PRIMARY FOCUS: SẢN PHẨM (THE CENTERPIECE) -->
							<li class="group/mega relative h-full flex items-center">
								<NuxtLink 
									to="/products?category_ids=1" 
									class="nav-link-primary" 
									:class="{ 'active-underline': $route.fullPath === '/products?category_ids=1' }"
								>
									XE MÁY
									<span class="nav-underline"></span>
								</NuxtLink>
								
								<!-- MEGA MENU (HONDA/YAMAHA STYLE) -->
								<div 
									class="mega-menu fixed left-0 w-full bg-white shadow-2xl border-t border-gray-100 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-300 pt-12 pb-16 z-[100] top-full"
									style="transition-delay: 100ms;"
								>
									<div class="max-w-[1440px] mx-auto px-10 grid grid-cols-4 gap-12">
										<!-- CATEGORIES -->
										<div class="space-y-8 col-span-1 border-r border-gray-50 pr-8">
											<h4 class="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-b border-gray-50 pb-4">Phân khúc xe</h4>
											<div class="grid grid-cols-1 gap-2">
												<NuxtLink v-for="cat in megaMenuCategories" :key="cat.name" :to="cat.path" class="flex items-center gap-5 p-3 rounded-xl hover:bg-gray-50 group/cat transition-all border border-transparent">
													<div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover/cat:bg-white transition-colors">
														<Icon :name="cat.icon" class="text-lg text-gray-400 group-hover/cat:text-[#E60012]" />
													</div>
													<div class="flex flex-col">
														<span class="text-[12px] font-bold text-gray-900 uppercase group-hover/cat:text-[#E60012] transition-colors">{{ cat.name }}</span>
														<span class="text-[10px] text-gray-400 font-medium">{{ cat.desc }}</span>
													</div>
												</NuxtLink>
											</div>
										</div>

										<!-- BRANDS -->
										<div class="space-y-8 col-span-2">
											<h4 class="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-b border-gray-50 pb-4">Thương hiệu phân phối</h4>
											<div class="grid grid-cols-2 gap-4">
												<NuxtLink v-for="brand in megaMenuBrands" :key="brand.name" :to="brand.path" class="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all group/brand border border-transparent">
													<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center p-4 shadow-sm border border-gray-100">
														<img :src="brand.logo" :alt="brand.name" class="w-full h-full object-contain filter grayscale group-hover/brand:grayscale-0 transition-all duration-500">
													</div>
													<span class="text-[12px] font-black text-gray-900 uppercase tracking-widest">XE {{ brand.name }}</span>
												</NuxtLink>
											</div>
										</div>

										<!-- FEATURED / PROMO (DYNAMIC) -->
										<div class="space-y-8 col-span-1">
											<h4 class="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] border-b border-gray-50 pb-4">Tiêu điểm</h4>
											<div class="bg-slate-900 rounded-2xl overflow-hidden relative group/feature aspect-[4/5] shadow-2xl">
												<img src="/assets/image/index/index-banner-bg.webp" alt="Featured" class="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700">
												<div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
												<div class="absolute bottom-0 left-0 p-6 w-full">
													<span class="text-[10px] font-bold text-[#e60023] uppercase tracking-widest block mb-2">{{ megaMenuSuggestions[0].label }}</span>
													<h5 class="text-lg font-black text-white uppercase italic leading-tight mb-4" v-html="megaMenuSuggestions[0].title.replace(' - ', '<br/>')"></h5>
													<NuxtLink :to="megaMenuSuggestions[0].path" class="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:gap-4 transition-all">
														Khám phá ngay <Icon name="fa6-solid:arrow-right" />
													</NuxtLink>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>

							<!-- OTHER PRIMARY ITEMS -->
							<li>
								<NuxtLink 
									to="/products" 
									class="nav-link-primary" 
									:class="{ 'active-underline': $route.fullPath === '/products' }"
								>
									BẢNG GIÁ 
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>
							<li>
								<NuxtLink 
									to="/promotion" 
									class="nav-link-primary" 
									:class="{ 'active-underline': $route.path === '/promotion' }"
								>
									KHUYẾN MÃI 
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>

							<!-- SECONDARY ITEMS (LIGHTER & SMALLER) -->
							<li>
								<NuxtLink 
									to="/service" 
									class="nav-link-secondary"
									:class="{ 'active-underline': $route.path === '/service' }"
								>
									Dịch vụ
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>
							<li>
								<NuxtLink 
									to="/products?category_ids=2,3" 
									class="nav-link-secondary"
									:class="{ 'active-underline': $route.fullPath === '/products?category_ids=2,3' }"
								>
									Phụ tùng & Phụ kiện
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>
							<li>
								<NuxtLink 
									to="/technology" 
									class="nav-link-secondary"
									:class="{ 'active-underline': $route.path === '/technology' }"
								>
									Công nghệ
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>
							<li>
								<NuxtLink 
									to="/compare" 
									class="nav-link-secondary"
									:class="{ 'active-underline': $route.path === '/compare' }"
								>
									So sánh xe
									<span class="nav-underline"></span>
								</NuxtLink>
							</li>
						</ul>
					</nav>
				</div>
				<!-- ACTIONS (CTA DUO) -->
				<!-- ACTIONS (CTA DUO + AUTH) -->
				<div class="flex items-center gap-4">
					<!-- CTA GROUP -->
					<div class="flex items-center gap-3">
						<button 
							class="px-6 py-2.5 border border-gray-200 text-gray-900 font-bold text-[12px] uppercase tracking-wider rounded-lg transition-all hover:bg-gray-900 hover:text-white active:scale-95 whitespace-nowrap"
							@click="isTestRideModalOpen = true"
						>
							Lái thử
						</button>
						<button 
							class="px-7 py-2.5 bg-[#e60023] text-white font-black text-[12px] uppercase tracking-wider rounded-lg shadow-[0_8px_25px_rgba(230,0,35,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(230,0,35,0.5)] hover:bg-[#c4001e] active:scale-95 whitespace-nowrap"
							@click="isQuoteModalOpen = true"
						>
							Báo giá
						</button>
					</div>

					<!-- AUTH SECTION -->
					<div class="flex items-center ml-1 pl-4 border-l border-gray-100">
						<template v-if="authStore.isLoggedIn">
							<div class="relative group">
								<button class="flex items-center gap-3 hover:opacity-80 transition-all cursor-pointer">
									<div class="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
										<img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover">
										<Icon v-else name="lucide:user" class="text-lg text-slate-400" />
									</div>
									<div class="hidden xl:flex flex-col items-start leading-tight">
										<span class="text-[12px] font-black text-slate-900 uppercase tracking-tight truncate max-w-[130px]">
											{{ authStore.user?.fullName || authStore.user?.userName }}
										</span>
									</div>
								</button>
								
								<!-- Dropdown Menu -->
								<div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[1100]">
									<div class="px-4 py-2 border-b border-gray-50 mb-2">
										<p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Tài khoản</p>
									</div>
									<NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#e60023] transition-colors">
										<Icon name="lucide:user-cog" class="text-lg opacity-50" />
										Thông tin cá nhân
									</NuxtLink>
									<NuxtLink to="/orders" class="flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-[#e60023] transition-colors">
										<Icon name="lucide:package" class="text-lg opacity-50" />
										Đơn hàng của tôi
									</NuxtLink>
									<div class="h-[1px] bg-gray-50 my-2"></div>
									<button @click="authStore.logout()" class="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-colors">
										<Icon name="lucide:log-out" class="text-lg" />
										Đăng xuất
									</button>
								</div>
							</div>
						</template>
						<template v-else>
							<NuxtLink to="/login" class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-50 text-slate-900 font-bold text-[12px] uppercase tracking-wider hover:bg-slate-100 transition-all border border-slate-100 whitespace-nowrap">
								<Icon name="lucide:user-circle" class="text-lg text-slate-400" />
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
						<span v-else class="font-black text-xl tracking-tighter">ANHEM MOTOR</span>
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
const isCartOpen = ref(false);
const isTestRideModalOpen = ref(false);
const isQuoteModalOpen = ref(false);

const handleContactSubmit = async (data) => {
	const { resetForm, ...formData } = data;
	const success = await contactStore.submitContact(formData);
	if (success && resetForm) { setTimeout(() => { isQuoteModalOpen.value = false; resetForm(); }, 2000); }
};

const megaMenuCategories = [
	{ name: 'Tất cả xe', path: '/products?category_ids=1', icon: 'fa6-solid:motorcycle', desc: 'Mọi dòng xe' },
	{ name: 'Xe Tay Ga', path: '/products?category_ids=1&search=tay ga', icon: 'fa6-solid:motorcycle', desc: 'Thanh lịch' },
	{ name: 'Xe Số', path: '/products?category_ids=1&search=xe so', icon: 'fa6-solid:motorcycle', desc: 'Bền bỉ' },
	{ name: 'Xe Côn Tay', path: '/products?category_ids=1&search=con tay', icon: 'fa6-solid:gauge-high', desc: 'Thể thao' },
	{ name: 'Xe PKL', path: '/products?category_ids=1&search=pkl', icon: 'fa6-solid:bolt', desc: 'Sức mạnh' },
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
	const handleScroll = () => { isScrolled.value = window.scrollY > 40; };
	onMounted(() => { window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll(); });
	onBeforeUnmount(() => { window.removeEventListener("scroll", handleScroll); });
}
</script>

<style scoped>
@reference "../../assets/main.css";

/* PRIMARY NAVIGATION (BOLD #111) */
.nav-link-primary {
	@apply relative h-full flex items-center text-[14px] font-bold text-[#111] transition-all duration-300 cursor-pointer uppercase tracking-tight;
}

.nav-link-primary:hover {
	@apply text-[#e60023];
}

/* SECONDARY NAVIGATION (LIGHTER GREY) */
.nav-link-secondary {
	@apply relative h-full flex items-center text-[13px] font-normal text-[#9ca3af] transition-all duration-300 cursor-pointer hover:text-[#e60023];
}

/* MICRO-INTERACTION: UNDERLINE ANIMATION */
.nav-underline {
	@apply absolute bottom-[-14px] left-0 w-0 h-[2.5px] bg-[#e60023] transition-all duration-300 ease-out;
}

.nav-link-primary:hover .nav-underline,
.nav-link-primary.active-underline .nav-underline,
.nav-link-secondary:hover .nav-underline,
.nav-link-secondary.active-underline .nav-underline {
	@apply w-full;
}

.nav-link-secondary.active-underline {
	@apply text-[#e60023] font-bold;
}

.mega-menu {
	animation: megaSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes megaSlideIn {
	from { opacity: 0; transform: translateY(15px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>

