module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-import"],
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
  extends: ["airbnb-typescript/base", "plugin:prettier/recommended"],
  rules: {
    "@typescript-eslint/indent": ["error", 2],
    "linebreak-style": ["warn", "unix"],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/quotes": ["error", "double"],
    //Remove or Keep?
    "import/prefer-default-export": "off",
    "max-len": [
      "warn",
      {
        code: 120,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-tabs": [
      "warn",
      {
        allowIndentationTabs: true,
      },
    ],
  },
};
