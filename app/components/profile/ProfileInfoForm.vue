<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { userMapper } from "@/mappers/userMapper";

const instance = useNuxtApp();
const userStore = useUserStore();
const isLoading = computed(() => userStore.isLoading);
const genderOptions = userMapper.genderOptions;

async function handleUpdateInfo() {
	const { success, error } = await userStore.updateProfile();
	if (success) {
		instance.$toast.success("Cập nhật thông tin thành công!");
	} else {
		instance.$toast.error(error);
	}
}
</script>

<template>
	<div
		class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fadeIn"
	>
		<div class="border-b border-gray-100 pb-5 mb-6">
			<h3 class="text-xl font-bold text-gray-900">Thông tin cá nhân</h3>
			<p class="text-sm text-gray-500 mt-1">
				Cập nhật thông tin liên hệ và định danh của bạn.
			</p>
		</div>

		<form class="space-y-6" @submit.prevent="handleUpdateInfo">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="md:col-span-2">
					<label
						for="fullName"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Họ và tên</label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-regular:user" class="text-gray-400" />
						</div>
						<input
							id="fullName"
							v-model="userStore.formData.fullName"
							type="text"
							class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm"
							placeholder="Nhập họ và tên của bạn"
						>
					</div>
				</div>

				<div>
					<label
						for="phoneNumber"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Số điện thoại</label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-solid:phone" class="text-gray-400" />
						</div>
						<input
							id="phoneNumber"
							v-model="userStore.formData.phoneNumber"
							type="tel"
							class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm"
							placeholder="Nhập số điện thoại"
						>
					</div>
				</div>

				<div>
					<label
						for="gender"
						class="block text-sm font-medium text-gray-700 mb-1.5"
						>Giới tính</label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
						>
							<Icon name="fa6-solid:venus-mars" class="text-gray-400" />
						</div>
						<select
							id="gender"
							v-model="userStore.formData.gender"
							class="block w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all sm:text-sm appearance-none"
						>
							<option value="" disabled>Chọn giới tính</option>
							<option
								v-for="option in genderOptions"
								:key="option.value"
								:value="option.value"
							>
								{{ option.label }}
							</option>
						</select>
						<div
							class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400"
						>
							<Icon name="fa6-solid:chevron-down" class="text-xs" />
						</div>
					</div>
				</div>
			</div>

			<div class="pt-4 flex justify-end">
				<button
					type="submit"
					:disabled="isLoading"
					class="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm shadow-blue-500/30 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
				>
					<Icon
						v-if="isLoading"
						name="fa6-solid:spinner"
						class="animate-spin mr-2"
					/>
					<Icon v-else name="fa6-solid:check" class="mr-2" />
					Lưu thông tin
				</button>
			</div>
		</form>
	</div>
</template>
