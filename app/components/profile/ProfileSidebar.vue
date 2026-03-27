<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

defineProps({
	modelValue: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const instance = useNuxtApp();
const authStore = useAuthStore();
const userStore = useUserStore();

const user = computed(() => authStore.user);
const isUploadingAvatar = computed(() => userStore.isUploadingAvatar);
const fileInput = ref(null);

function triggerAvatarUpload() {
	if (fileInput.value) fileInput.value.click();
}

async function handleAvatarChange(event) {
	const file = event.target.files[0];
	if (!file) return;

	const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
	if (!allowedTypes.includes(file.type)) {
		return instance.$toast.error(
			"Vui lòng chọn file hình ảnh (jpg, png, webp)!",
		);
	}

	const { success, error } = await userStore.uploadAvatar(file);
	if (success) {
		instance.$toast.success("Cập nhật ảnh đại diện thành công!");
	} else {
		instance.$toast.error(error);
	}

	if (fileInput.value) fileInput.value.value = "";
}

function setActiveTab(tab) {
	emit("update:modelValue", tab);
}
</script>

<template>
	<div class="lg:w-1/3 xl:w-1/4 flex flex-col gap-6">
		<div
			class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center"
		>
			<div
				class="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-md transition-all relative group cursor-pointer"
				:class="{ 'opacity-50 blur-[2px]': isUploadingAvatar }"
				@click="triggerAvatarUpload"
			>
				<img
					v-if="user?.avatarUrl"
					:src="user.avatarUrl"
					alt="Avatar"
					class="w-full h-full object-cover pointer-events-none"
				>
				<ClientOnly v-else>
					<Icon name="fa6-solid:user" class="text-red-500 text-4xl" />
					<template #fallback>
						<svg
							viewBox="0 0 448 512"
							class="w-9 h-9 text-red-500 fill-current"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 32C79.8 288 0 367.8 0 466.7v45.3h448v-45.3c0-98.9-79.8-178.7-178.3-178.7h-91.4z"
							/>
						</svg>
					</template>
				</ClientOnly>

				<div
					class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				>
					<Icon name="fa6-solid:camera" class="text-white text-2xl" />
				</div>
				<div
					v-if="isUploadingAvatar"
					class="absolute inset-0 flex items-center justify-center z-10"
				>
					<Icon
						name="fa6-solid:spinner"
						class="animate-spin text-red-600 text-3xl"
					/>
				</div>
			</div>

			<input
				ref="fileInput"
				type="file"
				class="hidden"
				accept="image/jpeg,image/png,image/webp,image/jpg"
				:disabled="isUploadingAvatar"
				@change="handleAvatarChange"
			>

			<h2 class="mt-5 text-xl font-bold text-gray-900 text-center">
				{{ user?.fullName || "Người dùng" }}
			</h2>
			<p
				class="text-gray-500 text-sm mt-1 text-center w-full truncate px-2"
				:title="user?.email"
			>
				{{ user?.email || user?.phoneNumber || "Chưa cập nhật email" }}
			</p>

			<button
				class="mt-6 w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
				:disabled="isUploadingAvatar"
				aria-label="Tải lên ảnh đại diện mới"
				@click="triggerAvatarUpload"
			>
				<Icon name="fa6-solid:cloud-arrow-up" />
				{{ isUploadingAvatar ? "Đang tải lên..." : "Đổi ảnh đại diện" }}
			</button>
		</div>

		<div
			class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
		>
			<nav class="flex flex-col">
				<button
					:class="[
						'flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all text-left border-l-4',
						modelValue === 'profile'
							? 'border-blue-600 bg-blue-50/50 text-blue-700'
							: 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
					]"
					@click="setActiveTab('profile')"
				>
					<div
						:class="[
							'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
							modelValue === 'profile'
								? 'bg-blue-100 text-blue-600'
								: 'bg-gray-100 text-gray-500',
						]"
					>
						<Icon name="fa6-regular:id-card" class="text-lg" />
					</div>
					Hồ sơ cá nhân
				</button>

				<div class="h-px bg-gray-100 mx-4" />

				<button
					:class="[
						'flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all text-left border-l-4',
						modelValue === 'security'
							? 'border-blue-600 bg-blue-50/50 text-blue-700'
							: 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
					]"
					@click="setActiveTab('security')"
				>
					<div
						:class="[
							'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
							modelValue === 'security'
								? 'bg-blue-100 text-blue-600'
								: 'bg-gray-100 text-gray-500',
						]"
					>
						<Icon name="fa6-solid:shield-halved" class="text-lg" />
					</div>
					Bảo mật & Mật khẩu
				</button>
			</nav>
		</div>
	</div>
</template>
