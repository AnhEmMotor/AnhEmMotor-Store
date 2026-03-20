<template>
	<header
		class="fixed top-0 w-full z-40 transition-all duration-300 ease-in-out border-b border-transparent bg-white/90 backdrop-blur-md"
		:class="{
			'shadow-md border-gray-100 py-2': isScrolled,
			'py-3': !isScrolled,
		}"
	>
		<div class="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
			<div class="relative flex h-16 sm:h-20 items-center justify-between">
				<!-- Brand Logo -->
				<div class="flex-none flex items-center">
					<button
						class="xl:hidden mr-3 p-2 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
						aria-label="Mở menu điều hướng"
						@click="openMobileNav"
					>
						<i class="fas fa-bars text-xl" />
					</button>

					<RouterLink
						to="/"
						class="group flex items-center gap-2 sm:gap-3 transition-all active:scale-95"
					>
						<div
							class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300"
						>
							<img
								src="/assets/image/logo-optimized.webp"
								alt="AnhEm Motor"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								width="40"
								height="40"
							/>
						</div>
						<div class="flex flex-col">
							<span
								class="text-lg sm:text-xl font-black tracking-tight text-gray-900 group-hover:text-red-500 transition-colors"
								>ANHEM MOTOR</span
							>
							<span
								class="hidden sm:block text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase leading-none"
								>Racing & Lifestyle</span
							>
						</div>
					</RouterLink>
				</div>

				<nav class="hidden xl:flex flex-1 justify-center px-8">
					<ul class="flex items-center gap-1">
						<li><RouterLink to="/" class="nav-link">Trang Chủ</RouterLink></li>
						<li>
							<RouterLink to="/category" class="nav-link">Sản Phẩm</RouterLink>
						</li>
						<li>
							<RouterLink to="/about" class="nav-link">Giới Thiệu</RouterLink>
						</li>
						<li>
							<RouterLink to="/news" class="nav-link">Tin Tức</RouterLink>
						</li>
						<li>
							<RouterLink to="/promotion" class="nav-link"
								>Khuyến Mãi</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/contact" class="nav-link">Liên Hệ</RouterLink>
						</li>
						<li>
							<RouterLink to="/service" class="nav-link">Dịch Vụ</RouterLink>
						</li>
					</ul>
				</nav>

				<!-- Action Icons & User -->
				<div class="flex-none flex items-center gap-2 sm:gap-4">
					<div class="flex items-center gap-1 sm:gap-2">
						<ClientOnly>
							<button
								v-if="cartItemCount > 0"
								class="header-icon-btn group"
								aria-label="Xem giỏ hàng"
								@click="toggleCart"
							>
								<div class="relative">
									<IconCart
										class="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors"
									/>
									<span
										class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300"
									>
										{{ cartItemCount }}
									</span>
								</div>
							</button>
						</ClientOnly>
					</div>

					<!-- Auth Buttons / User Menu -->
					<div class="hidden sm:flex items-center gap-3">
						<template v-if="!isLoggedIn">
							<RouterLink
								to="/login"
								class="hidden lg:block px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-red-500 transition-colors"
							>
								Đăng Nhập
							</RouterLink>
							<RouterLink
								to="/register"
								class="px-6 py-2.5 rounded-full font-black text-sm text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
							>
								Đăng Ký
							</RouterLink>
						</template>

						<div v-else class="relative user-menu-container">
							<button
								class="flex items-center gap-2 p-1 pr-3 bg-gray-50 border border-gray-100 rounded-full hover:bg-white hover:border-red-100 hover:shadow-md transition-all duration-300"
								aria-label="Mở menu người dùng"
								@click="toggleUserMenu"
							>
								<div
									class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
								>
									<img
										v-if="user?.avatarUrl"
										:src="user.avatarUrl"
										alt="Avatar"
										class="w-full h-full object-cover"
									/>
									<i v-else class="fas fa-user text-red-500 text-xs" />
								</div>
								<span
									class="hidden md:block text-sm font-bold text-gray-800 max-w-[100px] truncate"
								>
									{{ user?.fullName || user?.userName || user?.email }}
								</span>
								<i
									class="fas fa-chevron-down text-[10px] text-gray-400"
									:class="{ 'rotate-180': isUserMenuOpen }"
								/>
							</button>

							<div
								v-if="isUserMenuOpen"
								class="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] overflow-hidden"
							>
								<div
									class="px-5 py-4 bg-gray-50/50 border-b border-gray-100 mb-1"
								>
									<p
										class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1"
									>
										Tài khoản
									</p>
									<p class="text-sm font-bold text-gray-900 truncate">
										{{ user?.email }}
									</p>
								</div>
								<div class="px-2">
									<RouterLink
										to="/profile"
										class="dropdown-item"
										@click="isUserMenuOpen = false"
									>
										<div
											class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3"
										>
											<i class="fas fa-user-circle" />
										</div>
										<span>Trang Cá Nhân</span>
									</RouterLink>
									<RouterLink
										to="/orders"
										class="dropdown-item"
										@click="isUserMenuOpen = false"
									>
										<div
											class="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mr-3"
										>
											<i class="fas fa-shopping-bag" />
										</div>
										<span>Đơn Hàng Của Tôi</span>
									</RouterLink>
									<div class="h-px bg-gray-50 my-1 mx-3" />
									<button
										class="dropdown-item text-red-600 hover:bg-red-50 group"
										@click="handleLogout"
									>
										<div
											class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3 group-hover:bg-red-500 group-hover:text-white transition-colors"
										>
											<i class="fas fa-sign-out-alt" />
										</div>
										<span class="font-bold">Đăng Xuất</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Teleport to="body">
			<div
				v-if="mobileNavActive"
				class="fixed inset-0 z-[2000] bg-gray-900/60 backdrop-blur-sm"
				@click="closeMobileNav"
			/>

			<!-- Mobile Sidebar -->
			<nav
				class="fixed top-0 bottom-0 left-0 w-[300px] sm:w-[350px] bg-white shadow-2xl z-[2100] flex flex-col transform"
				:class="mobileNavActive ? 'translate-x-0' : '-translate-x-full'"
			>
				<div
					class="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-red-500 to-rose-600 shrink-0"
				>
					<div class="flex items-center gap-3">
						<div
							class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center whitespace-nowrap"
						>
							<img
								src="/assets/image/logo.webp"
								alt="Logo"
								class="w-7 h-7 object-contain"
							/>
						</div>
						<h3 class="m-0 text-xl font-black text-white tracking-tight">
							MENU
						</h3>
					</div>
					<button
						class="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
						aria-label="Đóng menu điều hướng"
						@click="closeMobileNav"
					>
						<i class="fas fa-times text-xl" />
					</button>
				</div>

				<div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
					<!-- Mobile User Info -->
					<div class="p-6 bg-gray-50 border-b border-gray-100">
						<template v-if="!isLoggedIn">
							<div class="grid grid-cols-2 gap-3">
								<RouterLink
									to="/login"
									class="w-full text-center py-3 rounded-xl font-bold text-red-500 border-2 border-red-500 bg-white active:scale-95 transition-all"
									@click="closeMobileNav"
								>
									Đăng Nhập
								</RouterLink>
								<RouterLink
									to="/register"
									class="w-full text-center py-3 rounded-xl font-bold text-white bg-red-500 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
									@click="closeMobileNav"
								>
									Đăng Ký
								</RouterLink>
							</div>
						</template>
						<div v-else class="flex flex-col gap-4">
							<div
								class="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
							>
								<div
									class="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-inner shrink-0"
								>
									<img
										v-if="user?.avatarUrl"
										:src="user.avatarUrl"
										alt="Avatar"
										class="w-full h-full object-cover"
									/>
									<i v-else class="fas fa-user text-red-500 text-xl" />
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-black text-gray-900 truncate leading-tight">
										{{ user?.fullName || user?.userName || user?.email }}
									</p>
									<p
										class="text-xs font-medium text-gray-500 truncate mt-0.5"
										v-if="(user?.fullName || user?.userName) && user?.email"
									>
										{{ user?.email }}
									</p>
								</div>
							</div>
							<button
								class="w-full py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
								@click="
									handleLogout();
									closeMobileNav();
								"
							>
								<i class="fas fa-sign-out-alt" />
								Đăng Xuất
							</button>
						</div>
					</div>

					<!-- Mobile Navigation Links -->
					<ul class="p-4 space-y-1">
						<li>
							<RouterLink to="/" class="mobile-nav-link" @click="closeMobileNav"
								><i class="fas fa-home w-8 text-red-500" />Trang Chủ</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/category"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-motorcycle w-8 text-red-500" />Sản
								Phẩm</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/about"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-info-circle w-8 text-red-500" />Giới
								Thiệu</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/news"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-newspaper w-8 text-red-500" />Tin
								Tức</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/promotion"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-tags w-8 text-red-500" />Khuyến
								Mãi</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/contact"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-paper-plane w-8 text-red-500" />Liên
								Hệ</RouterLink
							>
						</li>
						<li>
							<RouterLink
								to="/service"
								class="mobile-nav-link"
								@click="closeMobileNav"
								><i class="fas fa-tools w-8 text-red-500" />Dịch Vụ</RouterLink
							>
						</li>
					</ul>
				</div>
			</nav>
		</Teleport>

		<<<<<<< HEAD
		<!-- Cart Panel -->
		<CartPanel
			:is-open="isCartOpen"
			:cart-items="cartItems"
			:cart-total="cartTotal"
			@close="toggleCart"
			@update-quantity="updateCartItemQuantity"
			@remove-item="removeCartItem"
		/>
		=======
		<ClientOnly>
			<CartPanel
				:is-open="isCartOpen"
				:cart-items="cartDetails"
				:cart-total="cartTotal"
				@close="toggleCart"
				@update-quantity="updateCartItemQuantity"
				@remove-item="removeCartItem"
			/>
		</ClientOnly>
		>>>>>>> main
	</header>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, watch, onMounted } from "vue";
import IconCart from "~/assets/icons/cart.svg";
import CartPanel from "../cart/CartPanel.vue";
import { useCart } from "~/composables/useCart";
import { useAuthStore } from "~/stores/useAuthStore";

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
const isUserMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleUserMenu = () => {
	isUserMenuOpen.value = !isUserMenuOpen.value;
};

const handleLogout = async () => {
	isUserMenuOpen.value = false;
	await authStore.logout();
};

// Handle scroll effect
if (import.meta.client) {
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 20;
	};

	onMounted(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial check

		window.addEventListener("click", (e) => {
			if (!e.target.closest(".user-menu-container")) {
				isUserMenuOpen.value = false;
			}
		});
	});

	onBeforeUnmount(() => {
		window.removeEventListener("scroll", handleScroll);
	});
}

const mobileNavActive = ref(false);
const isCartOpen = ref(false);

const openMobileNav = () => {
	mobileNavActive.value = true;
	document.body.style.overflow = "hidden";
};
const closeMobileNav = () => {
	mobileNavActive.value = false;
	document.body.style.overflow = "";
};

const { cartItems, cartDetails, cartTotal, removeItem, updateQuantity } =
	useCart();
const cartItemCount = computed(() =>
	cartItems.value.reduce((s, i) => s + (i.quantity || 0), 0),
);

const toggleCart = () => {
	isCartOpen.value = !isCartOpen.value;
};

watch(isCartOpen, (open) => {
	document.body.style.overflow = open ? "hidden" : "";
});
const updateCartItemQuantity = (payload) => {
	updateQuantity(payload);
};
const removeCartItem = (index) => {
	removeItem(index);
};
onBeforeUnmount(() => {
	document.body.style.overflow = "";
});
</script>

<style scoped>
@reference "../../assets/main.css";

.nav-link {
	@apply relative px-4 py-2 text-sm font-bold text-gray-600 no-underline transition-all duration-300 ease-in-out hover:text-red-500 rounded-full hover:bg-red-50/50;
}

.nav-link.router-link-active {
	@apply text-red-500 bg-red-50;
}

.mobile-nav-link {
	@apply flex items-center rounded-xl py-4 px-4 text-sm font-bold text-gray-700 no-underline transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:pl-6 active:scale-[0.98];
}

.mobile-nav-link.router-link-active {
	@apply bg-red-50 text-red-600 pl-6 border-r-4 border-red-500;
}

.dropdown-item {
	@apply flex items-center px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer rounded-xl mx-1;
}

.header-icon-btn {
	@apply p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 active:scale-95 transition-all outline-none;
}

/* Custom Scrollbar for Mobile Nav */
.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	@apply bg-gray-200 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	@apply bg-gray-300;
}
</style>
