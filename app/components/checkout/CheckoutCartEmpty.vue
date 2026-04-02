<template>
	<div class="py-20 text-center">
		<div
			class="w-24 h-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
		>
			<Icon name="fa6-solid:cart-shopping" />
		</div>
		<h2 class="text-2xl font-black text-gray-900 mb-2">
			Giỏ hàng của bạn đang trống
		</h2>
		<p class="text-gray-500 mb-8">
			Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.
		</p>
		<NuxtLink
			to="/products"
			class="inline-flex items-center px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase text-sm tracking-widest"
		>
			Quay lại mua sắm
		</NuxtLink>
	</div>
</template>
