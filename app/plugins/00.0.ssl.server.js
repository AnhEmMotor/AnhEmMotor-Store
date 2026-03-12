import process from "node:process";

export default defineNuxtPlugin(() => {
	if (import.meta.server && process.env.NODE_ENV === "development") {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	}
});
