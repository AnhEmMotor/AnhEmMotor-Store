import process from "node:process";

export default defineNuxtPlugin(() => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
});
