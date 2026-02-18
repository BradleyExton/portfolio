import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import portfolio from "./tools/eslint-plugin-portfolio/index.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.tsx"],
    plugins: {
      portfolio,
    },
    rules: {
      "portfolio/component-entry-file-name": "error",
    },
  },
  {
    files: ["src/features/**/index.tsx", "src/components/UnderConstruction/index.tsx"],
    plugins: {
      portfolio,
    },
    rules: {
      "max-lines": [
        "error",
        { max: 260, skipBlankLines: true, skipComments: true },
      ],
      "portfolio/require-styles-import-in-component-entry": "error",
      "portfolio/require-component-contract-files": "error",
      "portfolio/no-inline-style-prop": "error",
    },
  },
  {
    files: ["src/features/**/styles.ts", "src/components/UnderConstruction/styles.ts"],
    plugins: {
      portfolio,
    },
    rules: {
      "max-lines": [
        "error",
        { max: 140, skipBlankLines: true, skipComments: true },
      ],
      "portfolio/no-hardcoded-hex-colors-in-styles": "error",
      "portfolio/no-nonsemantic-color-tokens-in-styles": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tools/**",
    // Design/prototype artifact, not part of runtime app.
    "homepage-preview.jsx",
  ]),
]);

export default eslintConfig;
