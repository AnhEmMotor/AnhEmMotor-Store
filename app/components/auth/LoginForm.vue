<script setup>
import { ref } from "vue";

const instance = useNuxtApp();
const identifier = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const passwordFieldType = ref("password");

const emit = defineEmits(['loading']);

function togglePassword() {
	passwordFieldType.value =
		passwordFieldType.value === "password" ? "text" : "password";
}

async function handleLogin() {
	if (!identifier.value || !password.value) {
		return instance.$toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập!");
	}
	
	isLoading.value = true;
	emit('loading', true);
	
	const authStore = useAuthStore();
	try {
		const result = await authStore.login({
			UsernameOrEmail: identifier.value,
			Password: password.value,
		});

		if (result?.error) throw result.error;

		authStore.setSuccessMessage("Đăng nhập thành công!");
		const router = useRouter();
		const route = useRoute();
		const redirect = route.query.redirect || "/";
		router.push(redirect);
	} catch (error) {
		const errorMessage = error.response?.data?.message || "Email hoặc mật khẩu không đúng!";
		instance.$toast.error(errorMessage);
	} finally {
		if (!authStore.isLoggedIn) {
			isLoading.value = false;
			emit('loading', false);
		}
	}
}
</script>

<template>
	<form @submit.prevent="handleLogin" class="space-y-6">
		<div class="space-y-2 animate-fade-in-up" style="animation-delay: 100ms">
			<label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email hoặc Tên đăng nhập</label>
			<input
				v-model="identifier"
				type="text"
				placeholder="example@email.com"
				class="custom-input"
				required
			/>
		</div>

		<div class="space-y-2 animate-fade-in-up" style="animation-delay: 200ms">
			<div class="flex justify-between items-center px-1">
				<label class="text-[11px] font-black text-gray-400 uppercase tracking-widest">Mật khẩu</label>
				<NuxtLink to="/forgot-password" class="text-xs font-bold text-primary hover:underline">Quên mật khẩu?</NuxtLink>
			</div>
			<div class="relative group">
				<input
					v-model="password"
					:type="passwordFieldType"
					placeholder="••••••••"
					class="custom-input"
					required
				/>
				<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors" @click="togglePassword">
					<Icon :name="passwordFieldType === 'password' ? 'fa6-solid:eye' : 'fa6-solid:eye-slash'" class="text-lg" />
				</button>
			</div>
		</div>

		<div class="flex items-center animate-fade-in-up" style="animation-delay: 300ms">
			<input id="remember" v-model="rememberMe" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
			<label for="remember" class="ml-2 text-sm font-bold text-gray-600">Ghi nhớ đăng nhập</label>
		</div>

		<button :disabled="isLoading" type="submit" class="primary-btn mt-4 animate-fade-in-up" style="animation-delay: 400ms">
			<template v-if="isLoading">
				<Icon name="fa6-solid:circle-notch" class="animate-spin mr-2" />
				Đang xử lý...
			</template>
			<template v-else>ĐĂNG NHẬP NGAY</template>
		</button>
	</form>
</template>

<style scoped>
@reference "../../assets/main.css";

@keyframes fade-in-up {
	from { opacity: 0; transform: translateY(15px); }
	to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
	opacity: 0;
	animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-input {


	@apply w-full h-14 px-6 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all duration-300;
}

.primary-btn {
	@apply w-full h-14 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_24px_rgba(227,24,55,0.22)] hover:shadow-[0_15px_30px_rgba(227,24,55,0.3)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none;
}
</style>
