import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
).map(config => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
})), {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    // rules: {
    //     "no-console": "error",
    //     "react/react-in-jsx-scope": "off",
    // },
    "rules": {
        "prettier/prettier": "warn",
        "react/jsx-uses-react": "off",
        // "react/react-in-jsx-scope": "off",
        // "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "args": "after-used",
                "ignoreRestSiblings": true,
                "varsIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/unbound-method": "off",
        "no-console": "error",
        "react/react-in-jsx-scope": "off", // jsx 문법 관련 off
    }
}];