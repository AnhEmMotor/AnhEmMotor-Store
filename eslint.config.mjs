import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: ['**/*.md', '.cursor/**', '.gemini/**', 'RULES.md'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Đồng bộ với Prettier: void elements (img, br, input...) giữ dấu slash />
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
]);
