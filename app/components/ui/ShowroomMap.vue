<script setup>
defineProps({
	showroom: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div
		class="rounded-[50px] overflow-hidden h-[500px] border-[10px] border-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] relative group"
	>
		<Transition name="fade" mode="out-in">
			<iframe
				:key="showroom.city"
				:title="`Bản đồ showroom tại ${showroom.city}`"
				:src="showroom.map"
				width="100%"
				height="100%"
				style="border: 0"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>
		</Transition>

		<div
			class="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10"
		>
			<div
				class="bg-white/95 backdrop-blur-3xl p-8 rounded-[35px] shadow-2xl space-y-4 border border-white relative overflow-hidden group/info"
			>
				<div class="absolute top-0 left-0 w-2 h-full bg-red-600" />
				<div class="flex justify-between items-start gap-4">
					<div class="space-y-2">
						<h4
							class="font-black text-xl text-slate-900 uppercase tracking-tighter flex items-center gap-2"
						>
							{{ showroom.city }}
						</h4>
						<p class="text-xs text-slate-500 font-medium max-w-[200px]">
							<Icon name="fa6-solid:location-dot" class="text-red-600 mr-2" />
							{{ showroom.address }}
						</p>
					</div>
					<a
						:href="`tel:${showroom.phone}`"
						class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
						aria-label="Gọi điện thoại liên hệ"
					>
						<Icon name="fa6-solid:phone" />
					</a>
				</div>
				<div class="flex gap-4 pt-4 border-t border-slate-100">
					<div
						class="text-[10px] font-black uppercase text-red-600 flex items-center gap-1"
					>
						<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
						Đang mở cửa
					</div>
					<a
						:href="
							'https://www.google.com/maps/dir/?api=1&destination=' +
							encodeURIComponent(showroom.address)
						"
						target="_blank"
						class="text-[10px] font-black uppercase text-slate-900 flex items-center gap-1 hover:text-red-600 transition-colors"
					>
						Chỉ đường
						<Icon
							name="fa6-solid:arrow-up-right-from-square"
							class="text-[8px]"
						/>
					</a>
					<p
						class="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-auto"
					>
						9:00 - 21:00
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
