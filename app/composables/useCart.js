import { ref, computed, watch, h } from "vue";
import { toast } from "vue3-toastify";
import { useQuery } from "@tanstack/vue-query";

const CART_KEY = "cartItems";
const cartItems = ref([]);

if (import.meta.client) {
	const stored = localStorage.getItem(CART_KEY);
	if (stored) {
		cartItems.value = JSON.parse(stored);
	}
}

watch(
	cartItems,
	(val) => {
		if (import.meta.client) {
			localStorage.setItem(CART_KEY, JSON.stringify(val));
		}
	},
	{ deep: true },
);

export function useCart() {
	const axios = useAxios();

	const variantIds = computed(() => cartItems.value.map((item) => item.id));

	const {
		data: batchDetails,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["cart-details-batch", variantIds],
		queryFn: async () => {
			const numericIds = variantIds.value
				.filter((id) => typeof id === "number" || !isNaN(Number(id)))
				.map(Number);
			if (numericIds.length === 0) return [];
			const { data } = await axios.post(
				"/api/v1/Product/variants-cart-details-batch",
				numericIds,
			);
			return data;
		},
		enabled: !!variantIds.value.length,
		staleTime: 1000 * 60 * 10,
	});

	const cartDetails = computed(() => {
		return cartItems.value.map((item) => {
			const detail = batchDetails.value?.find((d) => d.id === Number(item.id));

			if (detail) {
				return {
					...item,
					name: detail.displayName,
					price: detail.price,
					image:
						detail.coverImageUrl || "/assets/image/placeholder-product.webp",
					loading: false,
				};
			}

			return {
				...item,
				name: item.name || "Sản phẩm",
				price: item.price || 0,
				image: item.image || "/assets/image/placeholder-product.webp",
				loading: false,
			};
		});
	});

	const cartTotal = computed(() => {
		return cartDetails.value.reduce(
			(t, item) => t + item.price * item.quantity,
			0,
		);
	});

	function addItem(product, quantity = 1) {
		const idx = cartItems.value.findIndex((i) => i.id === product.id);
		let newQuantity = quantity;

		if (idx === -1) {
			const itemToAdd = {
				id: product.id,
				quantity,
				name: product.displayName || product.name || "Sản phẩm",
				price: product.price || 0,
				image:
					product.image ||
					product.coverImageUrl ||
					"/assets/image/placeholder-product.webp",
			};
			cartItems.value.push(itemToAdd);
		} else {
			cartItems.value[idx].quantity += quantity;
			newQuantity = cartItems.value[idx].quantity;
		}

		if (import.meta.client) {
			toast(
				h(
					"div",
					{
						class: "flex flex-col gap-1",
						style: { fontFamily: "'Be Vietnam Pro', sans-serif" },
					},
					[
						h("div", { class: "flex items-center gap-2" }, [
							h("span", { class: "font-bold text-sm" }, "🛒 Đã thêm vào giỏ"),
						]),
						h("div", { class: "text-xs text-gray-600" }, [
							h(
								"span",
								{ class: "font-bold" },
								product.displayName || product.name,
							),
						]),
						h(
							"div",
							{ class: "text-xs text-gray-500" },
							`Số lượng hiện tại: ${newQuantity}`,
						),
						h(
							"span",
							{
								class:
									"text-xs font-bold text-red-500 underline mt-1 block cursor-pointer",
								onClick: (e) => {
									e.preventDefault();
									navigateTo("/process-order");
								},
							},
							"Xem giỏ hàng & Thanh toán",
						),
					],
				),
				{
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: true,
				},
			);
		}
	}

	function removeItem(index) {
		cartItems.value.splice(index, 1);
	}

	function updateQuantity(idOrPayload, change) {
		if (typeof idOrPayload === "object" && idOrPayload.index !== undefined) {
			const { index, change: c } = idOrPayload;
			const item = cartItems.value[index];
			if (!item) return;
			item.quantity += c;
			if (item.quantity <= 0) cartItems.value.splice(index, 1);
		} else {
			const productId = idOrPayload;
			const newQuantity = change;
			const item = cartItems.value.find((i) => i.id === productId);
			if (item) {
				if (newQuantity <= 0) {
					const index = cartItems.value.indexOf(item);
					cartItems.value.splice(index, 1);
				} else {
					item.quantity = newQuantity;
				}
			}
		}
	}

	function clearCart() {
		cartItems.value = [];
	}

	return {
		cartItems,
		cartDetails,
		cartTotal,
		isPending,
		refreshDetails: refetch,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
	};
}

export default useCart;
