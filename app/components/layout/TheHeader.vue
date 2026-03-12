<template>
	<header
		class="fixed top-0 w-full z-50 bg-gradient-to-br from-white/98 to-rose-50/95 py-3 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out"
	>
		<div class="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
			<div class="relative flex h-20 items-center justify-between">
				<div class="flex-none flex items-center">
					<button
						class="xl:hidden mr-4 p-2 text-red-500 rounded-lg text-2xl transition-all hover:bg-red-500/10"
						@click="openMobileNav"
					>
						<i class="fas fa-bars"/>
					</button>

					<RouterLink
						to="/"
						class="flex items-center gap-3 whitespace-nowrap text-red-500 transition-transform hover:scale-105"
					>
						<div
							class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center overflow-hidden shrink-0"
						>
							<img
								src="/assets/image/logo.webp"
								alt="AnhEm Motor"
								class="w-full h-full object-cover"
							>
						</div>
						<span
							class="text-lg sm:text-2xl font-extrabold text-red-500 ml-2 block"
							>AnhEm Motor</span
						>
					</RouterLink>
				</div>

				<nav class="hidden xl:flex flex-1 justify-center px-4">
					<ul
						class="flex list-none gap-6 2xl:gap-10 m-0 p-0 items-center justify-center"
					>
						<li>
							<RouterLink to="/" class="desktop-nav-link">Trang Chủ</RouterLink>
						</li>
						<li>
							<RouterLink to="/category" class="desktop-nav-link"
								>Sản Phẩm</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/about" class="desktop-nav-link"
								>Giới Thiệu</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/news" class="desktop-nav-link"
								>Tin Tức</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/promotion" class="desktop-nav-link"
								>Khuyến Mãi</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/contact" class="desktop-nav-link"
								>Liên Hệ</RouterLink
							>
						</li>
						<li>
							<RouterLink to="/service" class="desktop-nav-link"
								>Dịch Vụ</RouterLink
							>
						</li>
					</ul>
				</nav>

				<div class="flex-none flex items-center gap-3 sm:gap-4">
					<div class="hidden xl:flex items-center gap-3">
						<template v-if="!isLoggedIn">
							<RouterLink
								to="/login"
								class="px-5 py-2.5 rounded-full font-bold text-base text-red-500 border-2 border-red-500 hover:bg-red-50 transition-all whitespace-nowrap"
							>
								Đăng Nhập
							</RouterLink>
							<RouterLink
								to="/register"
								class="px-5 py-2.5 rounded-full font-bold text-base text-white bg-red-500 border-2 border-red-500 hover:bg-red-600 hover:border-red-600 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
							>
								Đăng Ký
							</RouterLink>
						</template>

						<div v-else class="relative user-menu-container">
							<button
								class="flex items-center gap-2 p-1 pl-3 bg-white border border-gray-200 rounded-full hover:shadow-md transition-all duration-200"
								@click="toggleUserMenu"
							>
								<span
									class="text-sm font-bold text-gray-700 max-w-[120px] truncate"
									>{{ user?.fullName || user?.userName }}</span
								>
								<div
									class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
								>
									<img
										v-if="user?.avatarUrl"
										:src="user.avatarUrl"
										alt="Avatar"
										class="w-full h-full object-cover"
									>
									<i v-else class="fas fa-user text-red-500 text-sm"/>
								</div>
							</button>

							<Transition
								enter-active-class="transition duration-200 ease-out"
								enter-from-class="transform scale-95 opacity-0"
								enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-75 ease-in"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-95 opacity-0"
							>
								<div
									v-if="isUserMenuOpen"
									class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60]"
								>
									<div class="px-4 py-3 border-b border-gray-50 mb-1">
										<p
											class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
										>
											Tài khoản
										</p>
										<p class="text-sm font-bold text-gray-800 truncate">
											{{ user?.email }}
										</p>
									</div>
									<RouterLink
										to="/profile"
										class="dropdown-item"
										@click="isUserMenuOpen = false"
									>
										<i class="fas fa-user-circle mr-3 text-gray-400"/>
										<span>Trang Cá Nhân</span>
									</RouterLink>
									<RouterLink
										to="/orders"
										class="dropdown-item"
										@click="isUserMenuOpen = false"
									>
										<i class="fas fa-shopping-bag mr-3 text-gray-400"/>
										<span>Đơn Hàng Của Tôi</span>
									</RouterLink>
									<div class="h-px bg-gray-50 my-1"/>
									<button
										class="dropdown-item text-red-600 hover:bg-red-50 w-full text-left"
										@click="handleLogout"
									>
										<i class="fas fa-sign-out-alt mr-3"/>
										<span>Đăng Xuất</span>
									</button>
								</div>
							</Transition>
						</div>
					</div>

					<button
						class="relative p-2.5 text-red-500 rounded-lg text-xl transition-all hover:bg-red-500/10 ml-1"
						@click="toggleCart"
					>
						<IconCart />
						<span
							v-if="cartItemCount > 0"
							class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
						>
							{{ cartItemCount }}
						</span>
					</button>
				</div>
			</div>
		</div>

		<div
			class="fixed inset-0 z-[1050] h-full w-full bg-black/50 transition-opacity duration-300 ease-in-out"
			:class="mobileNavActive ? 'block opacity-100' : 'hidden opacity-0'"
			@click="closeMobileNav"
		/>

		<nav
			class="fixed top-0 h-screen w-[300px] bg-white shadow-2xl z-[1100] flex flex-col transition-all duration-300 ease-in-out"
			:class="mobileNavActive ? 'left-0' : '-left-[320px]'"
		>
			<div
				class="flex items-center justify-between border-b border-gray-100 p-5 bg-red-500"
			>
				<h3 class="m-0 text-2xl font-bold text-white">Menu</h3>
				<button
					class="text-2xl text-white transition-all hover:rotate-90"
					@click="closeMobileNav"
				>
					<i class="fas fa-times"/>
				</button>
			</div>

			<div class="flex-grow overflow-y-auto">
				<div
					class="p-5 flex flex-col gap-3 border-b border-gray-100 bg-gray-50"
				>
					<template v-if="!isLoggedIn">
						<RouterLink
							to="/register"
							class="w-full text-center py-3 rounded-lg font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all"
							@click="closeMobileNav"
						>
							Đăng Ký
						</RouterLink>
						<RouterLink
							to="/login"
							class="w-full text-center py-3 rounded-lg font-bold text-red-500 border-2 border-red-500 bg-white hover:bg-red-50 active:scale-95 transition-all"
							@click="closeMobileNav"
						>
							Đăng Nhập
						</RouterLink>
					</template>
					<div v-else class="flex flex-col gap-3">
						<div
							class="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
						>
							<div
								class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
							>
								<img
									v-if="user?.avatarUrl"
									:src="user.avatarUrl"
									alt="Avatar"
									class="w-full h-full object-cover"
								>
								<i v-else class="fas fa-user text-red-500 text-lg"/>
							</div>
							<div class="flex-1 overflow-hidden">
								<p class="font-bold text-gray-800 truncate">
									{{ user?.fullName || user?.userName }}
								</p>
								<p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
							</div>
						</div>
						<button
							class="w-full text-center py-3 rounded-lg font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
							@click="
								handleLogout();
								closeMobileNav();
							"
						>
							<i class="fas fa-sign-out-alt"/>
							Đăng Xuất
						</button>
					</div>
				</div>

				<ul class="m-0 list-none p-4">
					<li>
						<RouterLink to="/" class="mobile-nav-link" @click="closeMobileNav"
							>Trang Chủ</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/category"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Sản Phẩm</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/about"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Giới Thiệu</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/news"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Tin Tức</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/promotion"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Khuyến Mãi</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/contact"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Liên Hệ</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/service"
							class="mobile-nav-link"
							@click="closeMobileNav"
							>Dịch Vụ</RouterLink
						>
					</li>
				</ul>
			</div>
		</nav>

		<CartPanel
			:is-open="isCartOpen"
			:cart-items="cartItems"
			:cart-total="cartTotal"
			@close="toggleCart"
			@update-quantity="updateCartItemQuantity"
			@remove-item="removeCartItem"
		/>
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

const toggleUserMenu = () => {
	isUserMenuOpen.value = !isUserMenuOpen.value;
};

const handleLogout = async () => {
	isUserMenuOpen.value = false;
	await authStore.logout();
};

// Close dropdown when clicking outside
if (import.meta.client) {
	onMounted(() => {
		window.addEventListener("click", (e) => {
			if (!e.target.closest(".user-menu-container")) {
				isUserMenuOpen.value = false;
			}
		});
	});
}

const mobileNavActive = ref(false);
const isCartOpen = ref(false);

const openMobileNav = () => {
	mobileNavActive.value = true;
};
const closeMobileNav = () => {
	mobileNavActive.value = false;
};

const { cartItems, cartTotal, fetchCart, removeItem, updateQuantity } =
	useCart();
const cartItemCount = computed(() =>
	cartItems.value.reduce((s, i) => s + (i.quantity || 0), 0),
);

const toggleCart = async () => {
	await fetchCart();
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

.desktop-nav-link {
	@apply relative rounded-full py-2.5 px-3 2xl:px-5 text-base font-bold text-gray-700 no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-600 whitespace-nowrap;
}

.mobile-nav-link {
	@apply block rounded-lg py-3.5 px-4 text-base font-semibold text-gray-700 border-b border-gray-50 no-underline transition-all duration-200 ease-in-out hover:bg-rose-50 hover:text-red-500 hover:pl-6;
}

.dropdown-item {
	@apply flex items-center px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200;
}
</style>
