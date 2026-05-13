<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();
const { floatingButtons } = storeToRefs(layoutStore);

const isVisible = ref(false);
const isContactOpen = ref(false);

const handleScroll = () => {
	isVisible.value = window.scrollY > 400;
};

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
	<div
		v-if="isVisible"
		class="fixed bottom-10 right-6 z-[100] flex flex-col items-end gap-4"
	>
		<TransitionGroup
			name="slide-fade"
			tag="div"
			class="flex flex-col gap-3 mb-2"
		>
			<template v-if="isContactOpen">
				<a
					v-for="(btn, idx) in floatingButtons"
					:key="btn.label"
					:href="btn.action"
					target="_blank"
					:style="{ transitionDelay: `${idx * 50}ms` }"
					:class="[
						'flex items-center gap-3 p-4 rounded-3xl transition-all hover:scale-110 active:scale-95 shadow-2xl border border-white/10 text-white',
						btn.color,
					]"
				>
					<span
						class="text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
					>
						{{ btn.label }}
					</span>
					<Icon :name="btn.icon" class="text-xl" />
				</a>
			</template>

			<button
				v-if="isContactOpen"
				class="flex items-center gap-3 p-4 rounded-3xl transition-all hover:scale-110 active:scale-95 shadow-2xl border border-white/10 text-white bg-slate-900"
				style="transition-delay: 200ms"
				@click="scrollToTop"
			>
				<span
					class="text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
				>
					Lên đầu trang
				</span>
				<Icon name="fa6-solid:arrow-up" class="text-xl" />
			</button>
		</TransitionGroup>

		<button
			:class="[
				'w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-[101] border-4 border-white/20 overflow-hidden text-white',
				isContactOpen
					? 'bg-slate-800 rotate-180 scale-90'
					: 'bg-red-600 hover:scale-110',
			]"
			@click="isContactOpen = !isContactOpen"
		>
			<Icon
				:name="isContactOpen ? 'fa6-solid:xmark' : 'fa6-solid:comment-dots'"
				class="text-3xl"
			/>
			<span
				v-if="!isContactOpen"
				class="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"
			/>
		</button>
	</div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(20px) scale(0.5);
	opacity: 0;
}
</style>

