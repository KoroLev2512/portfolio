import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginUnicorn.configs.recommended,
  {
    name: "portfolio/unicorn-overrides",
    // Rules disabled below clash with Next/React (null, filenames), browser APIs (window), or TS idioms.
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/import-style": "off",
      "unicorn/prefer-query-selector": "off",
      "unicorn/switch-case-braces": "off",
      "unicorn/no-useless-switch-case": "off",
      "unicorn/explicit-length-check": "off",
      "unicorn/no-negated-condition": "off",
      "unicorn/catch-error-name": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/prefer-export-from": "off",
      "unicorn/prefer-dom-node-dataset": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/prefer-logical-operator-over-ternary": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/prefer-dom-node-append": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".sanity/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
