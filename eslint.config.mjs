import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
	{
		ignores: ["**/*.md", ".cursor/**", ".gemini/**", "RULES.md"],
	},
	{
		rules: {
			"vue/multi-word-component-names": "off",
			"vue/no-v-html": "off",
			"no-console": "warn",
			"no-empty": ["error", { allowEmptyCatch: true }],
		},
	},
]);
