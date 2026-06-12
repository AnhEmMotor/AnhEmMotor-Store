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
				<div class="flex-none flex items-center">
					<button
						class="xl:hidden mr-3 p-2 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
						aria-label="Mở menu điều hướng"
						@click="openMobileNav"
					>
						<Icon name="fa6-solid:bars" class="text-xl" />
					</button>

					<RouterLink
						to="/"
						class="group flex items-center gap-2 sm:gap-3 transition-all active:scale-95"
					>
						<div
							class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300"
						>
							<img
								src="/assets/image/logo.webp"
								alt="AnhEm Motor"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								width="40"
								height="40"
							>
						</div>
						<div class="flex flex-col">
							<span
								class="text-lg sm:text-xl font-black tracking-tight text-gray-900 group-hover:text-red-500 transition-colors"
								>ANHEM MOTOR</span
							>
							<span
								class="hidden sm:block text-[10px] font-bold text-[#515267] tracking-[0.2em] uppercase leading-none"
								>Racing & Lifestyle</span
							>
						</div>
					</RouterLink>
				</div>

				<nav class="hidden xl:flex flex-1 justify-center px-8">
					<ul class="flex items-center gap-1">
						<li v-for="item in navItems" :key="item.path">
							<RouterLink :to="item.path" class="nav-link">{{
								item.name
							}}</RouterLink>
						</li>
					</ul>
				</nav>

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
									<Icon
										name="fa6-solid:cart-shopping"
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
									class="w-8 h-8 sm:w-9 sm:h-9 bg-red-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm rounded-full"
								>
									<img
										v-if="user?.avatarUrl"
										:src="user.avatarUrl"
										alt="Avatar"
										class="w-full h-full object-cover pointer-events-none"
									>
									<ClientOnly v-else>
										<Icon name="fa6-solid:user" class="text-red-500 text-xs" />
										<template #fallback>
											<svg
												viewBox="0 0 448 512"
												class="w-3 h-3 text-red-500 fill-current"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 32C79.8 288 0 367.8 0 466.7v45.3h448v-45.3c0-98.9-79.8-178.7-178.3-178.7h-91.4z"
												/>
											</svg>
										</template>
									</ClientOnly>
								</div>
								<span
									class="hidden md:block text-sm font-bold text-gray-800 max-w-[100px] truncate"
								>
									{{ user?.fullName || user?.userName || user?.email }}
								</span>
								<ClientOnly>
									<Icon
										name="fa6-solid:chevron-down"
										class="text-[10px] text-gray-400"
										:class="{ 'rotate-180': isUserMenuOpen }"
									/>
									<template #fallback>
										<div class="w-2.5 h-2.5" />
									</template>
								</ClientOnly>
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
											<ClientOnly>
												<Icon name="fa6-solid:circle-user" />
											</ClientOnly>
										</div>
										<span>Sửa thông tin</span>
									</RouterLink>
									<RouterLink
										to="/orders"
										class="dropdown-item"
										@click="isUserMenuOpen = false"
									>
										<div
											class="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mr-3"
										>
											<ClientOnly>
												<Icon name="fa6-solid:bag-shopping" />
											</ClientOnly>
										</div>
										<span>Đơn hàng của tôi</span>
									</RouterLink>
									<div class="h-px bg-gray-50 my-1 mx-3" />
									<button
										class="dropdown-item text-red-600 hover:bg-red-50 group"
										aria-label="Đăng xuất khỏi hệ thống"
										@click="handleLogout"
									>
										<div
											class="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3 group-hover:bg-red-500 group-hover:text-white transition-colors"
										>
											<ClientOnly>
												<Icon name="fa6-solid:right-from-bracket" />
											</ClientOnly>
										</div>
										<span class="font-bold">Đăng xuất</span>
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
							>
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
						<ClientOnly>
							<Icon name="fa6-solid:xmark" class="text-xl" />
						</ClientOnly>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
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
									class="w-14 h-14 bg-red-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-inner shrink-0"
								>
									<img
										v-if="user?.avatarUrl"
										:src="user.avatarUrl"
										alt="Avatar"
										class="w-full h-full object-cover pointer-events-none"
									>
									<ClientOnly v-else>
										<Icon name="fa6-solid:user" class="text-red-500 text-xl" />
										<template #fallback>
											<svg
												viewBox="0 0 448 512"
												class="w-5 h-5 text-red-500 fill-current"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 32C79.8 288 0 367.8 0 466.7v45.3h448v-45.3c0-98.9-79.8-178.7-178.3-178.7h-91.4z"
												/>
											</svg>
										</template>
									</ClientOnly>
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-black text-gray-900 truncate leading-tight">
										{{ user?.fullName || user?.userName || user?.email }}
									</p>
									<p
										v-if="(user?.fullName || user?.userName) && user?.email"
										class="text-xs font-medium text-gray-500 truncate mt-0.5"
									>
										{{ user?.email }}
									</p>
								</div>
							</div>
							<button
								class="w-full py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
								aria-label="Đăng xuất tài khoản"
								@click="
									handleLogout();
									closeMobileNav();
								"
							>
								<ClientOnly>
									<Icon name="fa6-solid:right-from-bracket" />
								</ClientOnly>
								<span>Đăng Xuất</span>
							</button>
						</div>
					</div>

					<ul class="p-4 space-y-1">
						<li v-for="item in navItems" :key="item.path">
							<RouterLink
								:to="item.path"
								class="mobile-nav-link"
								@click="closeMobileNav"
							>
								<ClientOnly>
									<Icon
										:name="getIconForPath(item.path)"
										class="w-8 text-red-500"
									/>
								</ClientOnly>
								<span>{{ item.name }}</span>
							</RouterLink>
						</li>
					</ul>
				</div>
			</nav>
		</Teleport>
		<ClientOnly>
			<CartPanel
				:is-open="isCartOpen"
				:cart-items="cartDetails"
				:cart-total="cartTotal"
				:is-checking="isChecking"
				@close="toggleCart"
				@update-quantity="updateCartItemQuantity"
				@remove-item="removeCartItem"
			/>
		</ClientOnly>
	</header>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, watch, onMounted } from "vue";
import CartPanel from "../cart/CartPanel.vue";
import { useCart } from "~/composables/useCart";
import { useAuthStore } from "~/stores/auth.store";
import { useLayoutStore } from "~/stores/layout.store";

const authStore = useAuthStore();
const layoutStore = useLayoutStore();
const navItems = computed(() => layoutStore.navItems);
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

if (import.meta.client) {
	const handleScroll = () => {
		isScrolled.value = window.scrollY > 20;
	};

	onMounted(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll();

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

const {
	cartItems,
	cartDetails,
	cartTotal,
	removeItem,
	updateQuantity,
	isChecking,
	validateProductLimit,
} = useCart();
const cartItemCount = computed(() =>
	cartItems.value.reduce((s, i) => s + (i.quantity || 0), 0),
);

const toggleCart = () => {
	isCartOpen.value = !isCartOpen.value;
};

watch(isCartOpen, (open) => {
	document.body.style.overflow = open ? "hidden" : "";
});
const updateCartItemQuantity = async (payload) => {
	const { index, change } = payload;
	const item = cartDetails.value[index];
	if (!item) return;

	if (change > 0) {
		isChecking.value = true;
		await new Promise((resolve) => setTimeout(resolve, 500));

		const validation = validateProductLimit(item.id, change);
		if (!validation.isValid) {
			useNuxtApp().$toast.error(validation.message, {
				position: "bottom-right",
				autoClose: 3000,
			});
			isChecking.value = false;
			return;
		}
		isChecking.value = false;
	}

	updateQuantity(payload);
};
const removeCartItem = (index) => {
	removeItem(index);
};
onBeforeUnmount(() => {
	document.body.style.overflow = "";
});
const getIconForPath = (path) => {
	const icons = {
		"/": "fa6-solid:house",
		"/products": "fa6-solid:motorcycle",
		"/about": "fa6-solid:circle-info",
		"/news": "fa6-solid:newspaper",
		"/promotion": "fa6-solid:tags",
		"/contact": "fa6-solid:paper-plane",
		"/service": "fa6-solid:screwdriver-wrench",
	};
	return icons[path] || "fa6-solid:link";
};
</script>

<style scoped>
@reference "../../assets/main.css";

.nav-link {
	@apply relative px-4 py-2 text-sm font-bold text-gray-600 no-underline transition-all duration-300 ease-in-out hover:text-[#A4040F] rounded-full hover:bg-red-50/50;
}

.nav-link.router-link-active {
	@apply text-[#A4040F] bg-red-50;
}

.mobile-nav-link {
	@apply flex items-center rounded-xl py-4 px-4 text-sm font-bold text-gray-700 no-underline transition-all duration-300 hover:bg-red-50 hover:text-[#A4040F] hover:pl-6 active:scale-[0.98];
}

.mobile-nav-link.router-link-active {
	@apply bg-red-50 text-[#A4040F] pl-6 border-r-4 border-[#A4040F];
}

.dropdown-item {
	@apply flex items-center px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer rounded-xl mx-1;
}

.header-icon-btn {
	@apply p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 active:scale-95 transition-all outline-none;
}

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
