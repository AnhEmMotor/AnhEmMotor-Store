<template>
	<div
		class="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-100"
	>
		<div
			class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
		>
			<Icon name="fa6-solid:basket-shopping" class="text-3xl text-gray-300" />
		</div>
		<h2 class="text-xl font-bold text-gray-900 mb-2">
			Bạn chưa có đơn hàng nào
		</h2>
		<p class="text-gray-500 mb-8">
			Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và đặt hàng ngay!
		</p>
		<RouterLink
			to="/products"
			class="inline-flex items-center px-8 py-3 bg-red-500 text-white font-black rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all active:scale-95"
		>
			Mua sắm ngay
		</RouterLink>
	</div>
</template>

<style scoped>
.bg-red-500 {
	background-color: #e31837;
}
</style>
