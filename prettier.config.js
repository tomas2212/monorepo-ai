/**
 * @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig & import('prettier-plugin-tailwindcss').PluginOptions}
 */
const config = {
  // Keep Tailwind plugin last so class sorting still runs after import sorting.
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Other packages from node_modules
    "^@/", // Internal absolute imports using the @/ alias
    "^[./]", // Relative imports from current or parent directories
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  endOfLine: "lf",
};

export default config;