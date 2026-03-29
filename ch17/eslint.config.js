import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from 'eslint-config-prettier';

export default defineConfig([
    {
        ignores: [
            'ch01/format_sample.js'
        ]
    },

    {
        files: [
            "**/*.{js,mjs,cjs}"
        ],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser }
    },

    prettier
]);
