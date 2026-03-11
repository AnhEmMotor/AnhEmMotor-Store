import { ref, computed, watch } from "vue";

const CART_KEY = "cartItems";

const cartItems = ref([]);

if (import.meta.client) {
	const stored = localStorage.getItem(CART_KEY);
	if (stored) {
		cartItems.value = JSON.parse(stored);
	}
}

const cartTotal = computed(() => {
	return cartItems.value.reduce((t, item) => t + item.price * item.quantity, 0);
});

watch(
	cartItems,
	(val) => {
		if (import.meta.client) {
			localStorage.setItem(CART_KEY, JSON.stringify(val));
		}
	},
	{ deep: true },
);

const findIndex = (product) =>
	cartItems.value.findIndex((i) => i.id === product.id);

async function fetchCart() {
	return cartItems.value;
}

function addItem(product, quantity = 1) {
	const idx = findIndex(product);
	if (idx === -1) {
		cartItems.value.push({ ...product, quantity });
	} else {
		cartItems.value[idx].quantity += quantity;
	}
}

function removeItem(index) {
	cartItems.value.splice(index, 1);
}

function updateQuantity({ index, change }) {
	const item = cartItems.value[index];
	if (!item) return;
	item.quantity += change;
	if (item.quantity <= 0) cartItems.value.splice(index, 1);
}

function clearCart() {
	cartItems.value = [];
}

export function useCart() {
	return {
		cartItems,
		cartTotal,
		fetchCart,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
	};
}

export default useCart;
