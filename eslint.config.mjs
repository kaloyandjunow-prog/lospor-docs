import js from "@eslint/js"
import tseslint from "typescript-eslint"

// The docs site had a `build` script and nothing else -- a broken config or an
// unused import only ever surfaced as a Docusaurus build failure, if at all.
//
// Docusaurus does not ship an ESLint preset and this repo pulls in no Next
// config, so it can sit on eslint 10 directly, the same way lospor-core does.
// (The Next-based repos cannot: eslint-config-next bundles an
// eslint-plugin-react that still calls the context.getFilename() API eslint 10
// removed, and no fixed release exists.)
//
// Deliberately the recommended baseline. The point is catching unused values,
// unreachable code and undefined globals in the site configuration, not
// imposing a style on Markdown-adjacent code.
export default [
  {
    ignores: [
      "build/**",
      ".docusaurus/**",
      "node_modules/**",
      ".wrangler/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // docusaurus.config.ts and sidebars.ts are evaluated by Node during the
    // build, not in the browser bundle. Without these they report as
    // undefined -- a configuration gap, not a defect in them.
    files: ["*.ts", "*.mjs", "*.js"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]
