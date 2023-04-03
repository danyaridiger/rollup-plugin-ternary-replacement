module.exports = {
  env: {
    browser: false,
    es2021: true,
    amd: true,
    node: true,
   },
  extends: "eslint:recommended",
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: [
        "**/*.spec.js"
      ],
      env: {
        jest: true,
      },
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
}