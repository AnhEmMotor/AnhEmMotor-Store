<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user.store";

const instance = useNuxtApp();
const userStore = useUserStore();
const isLoading = computed(() => userStore.isLoading);

const passwordFieldType = ref({
	current: "password",
	new: "password",
	confirm: "password",
});

function togglePassword(field) {
	passwordFieldType.value[field] =
		passwordFieldType.value[field] === "password" ? "text" : "password";
}

async function handleUpdatePassword() {
	const { success, error } = await userStore.changePassword();
	if (success) {
		instance.$toast.success("Đổi mật khẩu thành công!");
	} else {
		instance.$toast.error(error);
	}
}
</script>

<template>
	<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
		<div class="border-b border-gray-100 pb-5 mb-6">
			<h3 class="text-xl font-bold text-gray-900">Đổi mật khẩu</h3>
			<p class="text-sm text-gray-500 mt-1">
				Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu mạnh và an toàn.
			</p>
		</div>

		<form class="space-y-6" @submit.prevent="handleUpdatePassword">
			<div class="space-y-6 max-w-lg">
				<div>
					<label
						for="currentPassword"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Mật khẩu hiện tại <span class="text-red-500">*</span></label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-solid:lock" class="text-gray-400" />
						</div>
						<input
							id="currentPassword"
							v-model="userStore.passwordData.currentPassword"
							:type="passwordFieldType.current"
							class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
							placeholder="Nhập mật khẩu hiện tại"
						>
						<button
							type="button"
							class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
							@click="togglePassword('current')"
						>
							<Icon
								:name="
									passwordFieldType.current === 'password'
										? 'fa6-regular:eye-slash'
										: 'fa6-regular:eye'
								"
							/>
						</button>
					</div>
				</div>

				<div>
					<label
						for="newPassword"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Mật khẩu mới <span class="text-red-500">*</span></label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-solid:key" class="text-gray-400" />
						</div>
						<input
							id="newPassword"
							v-model="userStore.passwordData.newPassword"
							:type="passwordFieldType.new"
							class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
							placeholder="Nhập mật khẩu mới"
						>
						<button
							type="button"
							class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
							@click="togglePassword('new')"
						>
							<Icon
								:name="
									passwordFieldType.new === 'password'
										? 'fa6-regular:eye-slash'
										: 'fa6-regular:eye'
								"
							/>
						</button>
					</div>
					<p class="mt-2 text-xs text-gray-500">
						Tối thiểu 6 ký tự, bao gồm ít nhất 1 chữ số và 1 ký tự đặc biệt (VD:
						@, #, $, ...).
					</p>
				</div>

				<div>
					<label
						for="confirmPassword"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Xác nhận mật khẩu mới <span class="text-red-500">*</span></label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-solid:shield-halved" class="text-gray-400" />
						</div>
						<input
							id="confirmPassword"
							v-model="userStore.passwordData.confirmPassword"
							:type="passwordFieldType.confirm"
							class="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white transition-all sm:text-sm"
							placeholder="Nhập lại mật khẩu mới"
						>
						<button
							type="button"
							class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 focus:outline-none"
							@click="togglePassword('confirm')"
						>
							<Icon
								:name="
									passwordFieldType.confirm === 'password'
										? 'fa6-regular:eye-slash'
										: 'fa6-regular:eye'
								"
							/>
						</button>
					</div>
				</div>
			</div>

			<div class="pt-2 flex justify-start">
				<button
					type="submit"
					:disabled="isLoading"
					class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm shadow-gray-900/20 text-sm font-semibold rounded-xl text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
				>
					<Icon
						v-if="isLoading"
						name="fa6-solid:spinner"
						class="animate-spin mr-2"
					/>
					Cập nhật mật khẩu
				</button>
			</div>
		</form>
	</div>
</template>
