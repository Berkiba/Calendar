import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
    //don't lint generated/dependency folders
    {
        ignores:[
            "node_modules/**",
            "dist/**",
            "build/**",
        ],
    },

    //standard js recommended rules
    js.configs.recommended,
    //standard typescript recommended rules
    ...tseslint.configs.recommended,

    //rules used for the browser-side react code
    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        plugins: {
            "react-hooks": reactHooks,
        },

        rules: {
            //checks correct usage of useState, useEffect, etc.
            ...reactHooks.configs.recommended.rules,

            "no-console": "off",
        },
    },
)