import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(["**/lib"]),
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended
]);
