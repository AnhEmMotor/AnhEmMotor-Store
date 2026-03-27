<template>
	<div
		class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
	>
		<h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
			<span
				class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
				>2</span
			>
			Phương thức thanh toán
		</h3>

		<div class="space-y-3">
			<div
				class="p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 bg-red-50 border-red-500 shadow-md shadow-red-500/10"
			>
				<div
					class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm"
				>
					💵
				</div>
				<div class="flex-1">
					<h5 class="font-bold text-gray-900">
						Thanh toán khi nhận hàng (COD)
					</h5>
					<p class="text-xs text-gray-500 font-medium">
						Bạn sẽ thanh toán bằng tiền mặt khi shipper giao hàng đến.
					</p>
				</div>
				<div class="text-red-500">
					<Icon name="fa6-solid:circle-check" class="text-xl" />
				</div>
			</div>

			<div
				class="p-4 bg-gray-100 rounded-xl flex items-center gap-3 grayscale opacity-60 cursor-not-allowed"
			>
				<div
					class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg"
				>
					🏦
				</div>
				<span class="text-sm font-bold text-gray-400"
					>Chuyển khoản (Đang bảo trì)</span
				>
			</div>
		</div>
	</div>
</template>
