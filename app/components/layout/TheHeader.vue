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
						<i class="fas fa-bars"></i>
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
							/>
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
		></div>

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
					<i class="fas fa-times"></i>
				</button>
			</div>

			<div class="flex-grow overflow-y-auto">
				<div
					class="p-5 flex flex-col gap-3 border-b border-gray-100 bg-gray-50"
				>
					<RouterLink
						to="/register"
						@click="closeMobileNav"
						class="w-full text-center py-3 rounded-lg font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all"
					>
						Đăng Ký
					</RouterLink>
					<RouterLink
						to="/login"
						@click="closeMobileNav"
						class="w-full text-center py-3 rounded-lg font-bold text-red-500 border-2 border-red-500 bg-white hover:bg-red-50 active:scale-95 transition-all"
					>
						Đăng Nhập
					</RouterLink>
				</div>

				<ul class="m-0 list-none p-4">
					<li>
						<RouterLink to="/" @click="closeMobileNav" class="mobile-nav-link"
							>Trang Chủ</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/category"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Sản Phẩm</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/about"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Giới Thiệu</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/news"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Tin Tức</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/promotion"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Khuyến Mãi</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/contact"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Liên Hệ</RouterLink
						>
					</li>
					<li>
						<RouterLink
							to="/service"
							@click="closeMobileNav"
							class="mobile-nav-link"
							>Dịch Vụ</RouterLink
						>
					</li>
				</ul>
			</div>
		</nav>

		<CartPanel
			:isOpen="isCartOpen"
			:cartItems="cartItems"
			:cartTotal="cartTotal"
			@close="toggleCart"
			@updateQuantity="updateCartItemQuantity"
			@removeItem="removeCartItem"
		/>
	</header>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, watch } from "vue";
import IconCart from "~/assets/icons/cart.svg";
import CartPanel from "../cart/CartPanel.vue";
import { useCart } from "~/composables/useCart";

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
</style>
