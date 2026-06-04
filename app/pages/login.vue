<script setup>
const isLoading = ref(false);

useSeoMeta({
	title: "Đăng Nhập | AnhEm Motor",
	description: "Đăng nhập vào cổng thông tin khách hàng AnhEm Motor để theo dõi bảo dưỡng và quản lý dịch vụ.",
});
</script>

<template>
	<div class="auth-wrapper min-h-screen bg-[#f8fafc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
		<!-- Dynamic Background Effects -->
		<div class="absolute inset-0 pointer-events-none z-0">
			<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"/>
			<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse delay-1000"/>
			
			<!-- Floating Particles -->
			<div
v-for="i in 5" :key="i" 
				class="absolute bg-primary/10 rounded-full blur-xl animate-float-slow"
				:style="{
					width: `${Math.random() * 80 + 40}px`,
					height: `${Math.random() * 80 + 40}px`,
					top: `${Math.random() * 100}%`,
					left: `${Math.random() * 100}%`,
					animationDelay: `${Math.random() * 5}s`,
					animationDuration: `${Math.random() * 10 + 10}s`
				}"
			/>
		</div>

		<div class="max-w-[1100px] w-full bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden grid lg:grid-cols-2 relative z-10 animate-fade-in-up">
			<!-- Left: Branding Panel (UI Component) -->
			<AuthLoginBranding />

			<!-- Right: Login Content -->
			<div class="p-8 md:p-16 flex flex-col justify-center">
				<!-- Header (UI Component) -->
				<AuthLoginHeader />

				<!-- Form (Logic + UI Component) -->
				<AuthLoginForm @loading="(val) => (isLoading = val)" />

				<!-- Social Login -->
				<AuthSocialLogin class="mt-8" @loading="(val) => (isLoading = val)" />

				<div class="mt-10 pt-8 border-t border-gray-100 text-center">
					<p class="text-sm text-gray-500 font-medium">
						Chưa có tài khoản?
						<NuxtLink to="/register" class="text-primary font-black uppercase tracking-wider ml-1 hover:underline">Đăng ký ngay</NuxtLink>
					</p>
					<p class="mt-6 text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Thông tin của bạn được bảo mật tuyệt đối</p>
				</div>
			</div>
		</div>
		<CommonFullLoading :show="isLoading" text="Đang xử lý đăng nhập..." />
	</div>
</template>

<style scoped>
.auth-wrapper {
	background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

@keyframes float-slow {
	0%, 100% { transform: translate(0, 0) rotate(0deg); }
	33% { transform: translate(30px, -50px) rotate(10deg); }
	66% { transform: translate(-20px, 20px) rotate(-10deg); }
}
.animate-float-slow {
	animation: float-slow 15s ease-in-out infinite;
}

@keyframes fade-in-up {
	from { opacity: 0; transform: translateY(30px); }
	to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
	animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

