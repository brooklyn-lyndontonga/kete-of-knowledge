import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "clean/admin/dist/**",
      "clean/mobile/.expo/**",
      "**/.git/**",
      "clean/server/uploads/**",
      "clean/server/db/**"
    ]
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        __DEV__: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
