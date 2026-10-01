import { fixupConfigRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

// eslint-plugin-react, -import and -jsx-a11y (pulled in by eslint-config-next)
// still call context APIs removed in ESLint 10, e.g. context.getFilename().
// fixupConfigRules shims them; drop it once those plugins support ESLint 10.
const eslintConfig = defineConfig([
  ...fixupConfigRules(nextVitals),
  ...fixupConfigRules(nextTs),
  eslintPluginUnicorn.configs.recommended,
  {
    name: "portfolio/unicorn-overrides",
    // Rules disabled below clash with Next/React (null, filenames), browser APIs (window), or TS idioms.
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/name-replacements": "off", // was prevent-abbreviations before unicorn 76
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
      "unicorn/dom-node-dataset": "off", // was prefer-dom-node-dataset
      "unicorn/prefer-global-this": "off",
      "unicorn/no-for-each": "off", // was no-array-for-each
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
