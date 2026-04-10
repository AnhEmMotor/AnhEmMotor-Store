<script setup>
import IconFacebook from "@/assets/icons/facebook.svg?component";
import IconGoogle from "@/assets/icons/google.svg?component";

const authStore = useAuthStore();
const instance = useNuxtApp();

const props = defineProps({
	mode: {
		type: String,
		default: "login",
	},
});

const isLoading = ref(false);
const emit = defineEmits(["loading"]);

const modeText = computed(() =>
	props.mode === "register" ? "Đăng ký" : "Đăng nhập",
);

const handleGoogleLogin = (response) => {
	(async () => {
		try {
			isLoading.value = true;
			emit("loading", true);
			const { error } = await authStore.loginWithGoogle(response.credential);
			if (!error) {
				await navigateTo("/");
			} else {
				instance.$toast.error(`${modeText.value} Google thất bại!`);
			}
		} finally {
			isLoading.value = false;
			emit("loading", false);
		}
	})();
};

const handleFacebookLogin = () => {
	if (
		window.location.protocol !== "https:" &&
		window.location.hostname !== "localhost"
	) {
		return instance.$toast.error("Facebook Login yêu cầu kết nối HTTPS!");
	}

	isLoading.value = true;
	emit("loading", true);
	window.FB.login(
		(response) => {
			if (response.authResponse) {
				(async () => {
					try {
						const { error } = await authStore.loginWithFacebook(
							response.authResponse.accessToken,
						);
						if (!error) {
							await navigateTo("/");
						} else {
							instance.$toast.error(`${modeText.value} Facebook thất bại!`);
						}
					} finally {
						isLoading.value = false;
						emit("loading", false);
					}
				})();
			} else {
				isLoading.value = false;
				emit("loading", false);
			}
		},
		{ scope: "email,public_profile" },
	);
};

const checkAndTriggerGoogle = () => {
	if (window.google) {
		window.google.accounts.id.prompt();
	} else {
		isLoading.value = true;
		let checkCount = 0;
		const timer = setInterval(() => {
			if (window.google) {
				clearInterval(timer);
				isLoading.value = false;
				window.google.accounts.id.prompt();
			}
			if (++checkCount > 10) {
				clearInterval(timer);
				isLoading.value = false;
				instance.$toast.error(
					"Google SDK chưa sẵn sàng. Vui lòng thử lại sau vài giây!",
				);
			}
		}, 500);
	}
};

const triggerGoogleLogin = () => {
	const googleBtn = document.querySelector(
		"#google-login-hidden [role='button']",
	);
	if (googleBtn) {
		googleBtn.click();
	} else {
		checkAndTriggerGoogle();
	}
};

onMounted(() => {
	let retryCount = 0;
	const maxRetries = 30;

	const initSocials = async () => {
		const configData = await authStore.getExternalAuthConfig();
		if (!configData) return;

		const googleClientId =
			configData.googleClientId || configData.GoogleClientId;
		const facebookAppId = configData.facebookAppId || configData.FacebookAppId;

		const initFB = () => {
			if (window.FB && facebookAppId && !window.__fb_initialized) {
				window.FB.init({
					appId: facebookAppId,
					cookie: true,
					xfbml: true,
					version: "v22.0",
				});
				window.__fb_initialized = true;
			}
		};

		const checkSocials = setInterval(() => {
			if (window.google && googleClientId) {
				if (!window.__google_initialized) {
					window.google.accounts.id.initialize({
						client_id: googleClientId,
						callback: handleGoogleLogin,
						auto_select: false,
						itp_support: true,
					});
					window.__google_initialized = true;
				}

				const targetElem = document.getElementById("google-login-hidden");
				if (targetElem && targetElem.children.length === 0) {
					window.google.accounts.id.renderButton(targetElem, {
						theme: "outline",
						size: "large",
						width: "384",
						type: "standard",
					});
				}
			}

			initFB();

			const isGoogleReady =
				window.__google_initialized &&
				(!document.getElementById("google-login-hidden") ||
					document.getElementById("google-login-hidden").children.length > 0);

			if (
				(isGoogleReady || !googleClientId) &&
				(window.__fb_initialized || !facebookAppId)
			) {
				clearInterval(checkSocials);
			}

			if (++retryCount >= maxRetries) {
				clearInterval(checkSocials);
			}
		}, 500);
	};

	initSocials();
});
</script>

<template>
	<div class="space-y-4">
		<div class="relative flex items-center justify-center py-2">
			<div class="flex-grow border-t border-gray-200 mt-3" />
			<span
				class="bg-white px-2 text-xs font-medium uppercase tracking-wider text-gray-400 mt-3"
				>HOẶC {{ modeText }} BẰNG</span
			>
			<div class="flex-grow border-t border-gray-200 mt-3" />
		</div>

		<div class="flex flex-col gap-3">
			<button
				:disabled="isLoading"
				type="button"
				class="social-btn google-btn"
				@click="triggerGoogleLogin"
			>
				<IconGoogle class="w-5 h-5" />
				<span>{{ modeText }} bằng Google</span>
			</button>

			<div id="google-login-hidden" class="hidden" />

			<button
				:disabled="isLoading"
				type="button"
				class="social-btn facebook-btn"
				@click="handleFacebookLogin"
			>
				<IconFacebook class="h-5 w-5 fill-current" />
				<span>{{ modeText }} bằng Facebook</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

.social-btn {
	@apply flex h-[52px] w-full items-center justify-center gap-3 rounded-[12px] px-4 font-bold shadow-sm transition-all duration-300 active:scale-[0.97] disabled:opacity-50 text-[15px] uppercase tracking-wide;
}

.google-btn {
	@apply bg-white text-slate-700 border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1];
}

.facebook-btn {
	@apply bg-[#1877F2] text-white hover:bg-[#166fe5] hover:shadow-lg hover:shadow-blue-500/20;
}
</style>
