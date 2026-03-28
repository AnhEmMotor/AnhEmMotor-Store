<template>
	<div class="bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
		<div class="max-w-6xl mx-auto space-y-6">
			<div class="mb-8">
				<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
					Quản lý tài khoản
				</h1>
				<p class="mt-2 text-sm text-gray-500">
					Xem và cập nhật thông tin cá nhân hoặc cài đặt bảo mật của bạn.
				</p>
			</div>

			<div class="flex flex-col lg:flex-row gap-8">
				<ProfileSidebar v-model="activeTab" />

				<div class="lg:w-2/3 xl:w-3/4">
					<ProfileInfoForm v-if="activeTab === 'profile'" />

					<ProfileSecurityForm v-if="activeTab === 'security'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { useUserStore } from "../stores/user.store";

import ProfileSidebar from "@/components/profile/ProfileSidebar.vue";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm.vue";
import ProfileSecurityForm from "@/components/profile/ProfileSecurityForm.vue";

useSeoMeta({
	title: "Chỉnh sửa hồ sơ | AnhEm Motor",
	description:
		"Quản lý thông tin cá nhân và tài khoản của bạn tại AnhEm Motor.",
});

const authStore = useAuthStore();
const userStore = useUserStore();

const activeTab = ref("profile");

watch(
	() => authStore.user,
	(newUser) => {
		if (newUser) userStore.initProfileForm(newUser);
	},
	{ immediate: true },
);
</script>

<style scoped></style>
