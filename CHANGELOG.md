# Patch notes

Current `rollup-plugin-ternary-replacement` version: **1.0.0**

---

### 0.0.1 (2022-03-04)

- Plugin `rollup-plugin-ternary-replacement` was released.

### 0.0.2 (2023-09-01)

- Fixing bug with incorrect ignore patterns for transformation in tests.
- Updating dependencies and dev-dependencies.

### 1.0.0 (2025-10-31)

- Added "@babel/eslint-parser", "@commitlint/cli", "@commitlint/config-conventional", "@rollup/plugin-commonjs",
  "@rollup/plugin-terser", "jest-environment-jsdom", "eslint-config-prettier", "eslint-plugin-jest",
  "@typescript-eslint/eslint-plugin", "rollup-plugin-banner2" and "@babel/plugin-transform-runtime" dev-dependencies.
- Added new workflows for dependency management and CI/CD goals.
- Added github issue templates.
- Added commitlint.
- Added bundlewatch tool.
- Added prettier formatter and its specific rules for eslint.
- Added lint-staged to perform linting and formatting tasks.
- Added husky with "pre-commit" and "commit-msg" hooks.
- Added SECURITY.md file for package security policy.
- Added editor configuration file.
- Added .gitattributes configuration file.
- Added some new scripts to package.json file.
- Added coverage configuration for unit testing.
- Added banner with package information to all output variants.
- Added some new unit-tests and changed example output tool for greater clarity.
- Changed rollup output format and added CJS output variant.
- Changed documentation for contributors.
- Changed package keywords.
- Changed Node.js platform version and added a treshold for the node platform versions.
- Changed eslint version and removed .eslintrc.js configuration file in favor of the new .eslintrc.json configuration file.
- Changed .gitignore and .npmignore configuration files and added .eslintignore configuration file.
- Fixed main documentation with more correct paragraphs.
- Renamed unit-tests tools with addition of the "tool" postfix.
- Removed "@babel/plugin-transform-runtime", "babel-preset-env" and "ts-jest" dev-dependencies.
- Removed "publish" workflow in favor of the new "release" workflow.
- Removed unnecessary extensions from Jest coverage configuration.
