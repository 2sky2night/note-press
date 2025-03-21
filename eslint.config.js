import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  ...pluginVue.configs["flat/recommended"],
  tseslint.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "node_modules",
      "dist",
      "*.md",
      "package.json",
      "pnpm-lock.yaml",
      "docs/.vitepress/cache/**",
      ".commitlintrc.cjs",
      ".prettierrc.cjs",
    ],
  },
]);
