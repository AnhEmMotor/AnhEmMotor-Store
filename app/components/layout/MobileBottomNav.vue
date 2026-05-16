<template>
	<div class="xl:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
		<div class="flex items-center justify-around h-16 px-4">
			<NuxtLink 
				v-for="item in navItems" 
				:key="item.path" 
				:to="item.path"
				class="flex flex-col items-center justify-center gap-1 group flex-1 transition-all duration-300"
				:class="[route.path === item.path ? 'text-primary' : 'text-gray-400']"
			>
				<div class="relative">
					<Icon 
						:name="item.icon" 
						class="text-2xl transition-transform duration-300 group-active:scale-110" 
						:class="[route.path === item.path ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600']"
					/>
					<span 
						v-if="route.path === item.path"
						class="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-white animate-pulse"
					></span>
				</div>
				<span class="text-[9px] font-black uppercase tracking-widest">{{ item.name }}</span>
			</NuxtLink>

			<!-- Mobile Menu Toggle Button (Alternative to Header) -->
			<button 
				class="flex flex-col items-center justify-center gap-1 group flex-1"
				@click="$emit('open-menu')"
			>
				<Icon name="ph:list-bold" class="text-2xl text-gray-400 group-hover:text-gray-600" />
				<span class="text-[9px] font-black uppercase tracking-widest text-gray-400">Menu</span>
			</button>
		</div>
	</div>
</template>

<script setup>
const route = useRoute();
defineEmits(['open-menu']);

const navItems = [
	{ name: 'Trang chủ', path: '/', icon: 'ph:house-bold' },
	{ name: 'Xe máy', path: '/products', icon: 'ph:motorcycle-bold' },
	{ name: 'Khuyến mãi', path: '/promotion', icon: 'ph:ticket-bold' },
	{ name: 'Liên hệ', path: '/support', icon: 'ph:chat-circle-dots-bold' },
];
</script>

<style scoped>
.pb-safe {
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
