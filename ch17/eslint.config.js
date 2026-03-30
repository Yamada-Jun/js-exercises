import js from "@eslint/js";
import globals from "globals";
import google from 'eslint-config-google';
import prettier from 'eslint-config-prettier';
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            'ex01/format_sample.js' // format_sample.jsを対象型外す
        ],

        files: [
            "**/*.{js,mjs,cjs}"
        ],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            globals: {
                ...globals.browser, // ブラウザ環境のグローバル変数を許可
                ...globals.node,    // Node.js環境のグローバル変数を許可
            },
        },

        rules: {
            ...js.configs.recommended.rules,    // ESLintの推奨ルールを適用
            ...google.rules,                    // Googleのスタイルガイドのルールを適用

            'require-jsdoc': 'off',             // TypeError対応
            'valid-jsdoc': 'off',               // TypeError対応
        },
    },


    prettier    // prettierとの競合対応
]);
