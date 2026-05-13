<script setup>
import { storeToRefs } from "pinia";


const compareStore = useCompareStore();
const { products } = storeToRefs(compareStore);

const isVisible = computed(() => products.value.length > 0);
</script>

<template>
	<Transition
		enter-active-class="transition duration-500 ease-out"
		enter-from-class="translate-y-full opacity-0"
		enter-to-class="translate-y-0 opacity-100"
		leave-active-class="transition duration-300 ease-in"
		leave-from-class="translate-y-0 opacity-100"
		leave-to-class="translate-y-full opacity-0"
	>
		<div v-if="isVisible" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4">
			<div class="bg-black/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 shadow-2xl shadow-black/50 flex items-center justify-between gap-6">
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 bg-[#CC0000] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
						<Icon name="fa6-solid:code-compare" class="text-xl" />
					</div>
					<div>
						<h4 class="text-white font-black uppercase tracking-widest text-[10px]">So sánh xe</h4>
						<p class="text-white/60 text-[11px] font-bold">Đã chọn {{ products.length }}/3 mẫu</p>
					</div>
				</div>

				<div class="flex items-center gap-2 overflow-hidden">
					<div 
						v-for="p in products" 
						:key="p.id"
						class="relative group"
					>
						<div class="w-14 h-14 bg-white/10 rounded-2xl p-1 border border-white/5 group-hover:border-[#CC0000] transition-colors">
							<img :src="p.image" :alt="p.name" class="w-full h-full object-contain">
						</div>
						<button 
							@click="compareStore.removeProduct(p.id)"
							class="absolute -top-1 -right-1 w-5 h-5 bg-[#CC0000] text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<Icon name="fa6-solid:xmark" />
						</button>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<button 
						@click="compareStore.clearAll"
						class="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
					>
						Xóa
					</button>
					<NuxtLink 
						to="/compare"
						class="px-8 py-4 bg-[#CC0000] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all active:scale-95 shadow-xl shadow-red-500/20"
					>
						So sánh ngay
					</NuxtLink>
				</div>
			</div>
		</div>
	</Transition>
</template>
