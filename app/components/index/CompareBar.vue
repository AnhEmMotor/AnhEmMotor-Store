<script setup>
import { useCompareStore } from "@/stores/compare.store";
import { formatCurrency } from "#imports";
const compareStore = useCompareStore();
</script>

<template>
	<Transition
		enter-active-class="transition duration-500 ease-out"
		enter-from-class="translate-y-full opacity-0"
		enter-to-class="translate-y-0 opacity-100"
		leave-active-class="transition duration-500 ease-in"
		leave-from-class="translate-y-0 opacity-100"
		leave-to-class="translate-y-full opacity-0"
	>
		<div
			v-if="compareStore.products.length > 0"
			class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl"
		>
			<div
				class="bg-slate-900 text-white rounded-[32px] p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl flex items-center justify-between gap-6 overflow-hidden relative group"
			>
				<div
					class="absolute -inset-x-full inset-y-0 skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-[200%] transition-all duration-1000"
				/>

				<div
					class="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar py-2"
				>
					<div
						v-for="p in compareStore.products"
						:key="p.id"
						class="flex items-center gap-3 bg-white/5 p-2 pr-4 rounded-2xl border border-white/5 min-w-[200px] group/item relative overflow-hidden"
					>
						<div
							class="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-lg p-1"
						>
							<img :src="p.image" class="w-full h-full object-contain" >
						</div>
						<div class="space-y-0.5">
							<h4
								class="text-[11px] font-black uppercase tracking-tight line-clamp-1"
							>
								{{ p.name }}
							</h4>
							<p class="text-[10px] text-red-400 font-bold">
								{{ formatCurrency(p.price) }}
							</p>
						</div>
						<button
							class="absolute -top-1 -right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all hover:scale-110"
							@click="compareStore.removeProduct(p.id)"
						>
							<Icon name="fa6-solid:xmark" class="text-[10px]" />
						</button>
					</div>

					<div
						v-if="compareStore.products.length < 3"
						class="flex items-center gap-3 border-2 border-dashed border-white/10 p-2 pr-4 rounded-2xl min-w-[200px] opacity-40"
					>
						<div
							class="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center"
						>
							<Icon name="fa6-solid:plus" class="text-xs" />
						</div>
						<span
							class="text-[10px] font-black uppercase tracking-widest italic"
							>Chọn thêm xe...</span
						>
					</div>
				</div>

				<div class="flex items-center gap-3 border-l border-white/10 pl-6">
					<div class="hidden md:block text-right">
						<p class="text-[10px] text-white/50 uppercase font-black">
							Sẵn sành so sánh
						</p>
						<p class="text-xs font-black">
							{{ compareStore.products.length }}/3 Sản phẩm
						</p>
					</div>
					<NuxtLink
						to="/compare"
						class="bg-red-600 hover:bg-white hover:text-slate-900 px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-red-600/30"
					>
						So sánh ngay
						<Icon name="fa6-solid:scale-balanced" class="text-xs" />
					</NuxtLink>
					<button
						class="p-3.5 rounded-2xl hover:bg-white/10 transition-all text-white/50 hover:text-white"
						title="Xóa tất cả"
						@click="compareStore.clearAll()"
					>
						<Icon name="fa6-solid:trash-can" class="text-sm" />
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
