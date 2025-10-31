# rollup-plugin-ternary-replacement v1.0.0

---

### Brief annotation

**rollup-plugin-ternary-replacement** is a plugin for Rollup, a popular module bundler for web applications. This plugin enhances application compatibility by automatically replacing modern ECMAScript features, such as the nullish coalescing operator (??), with equivalent ternary expressions.

The conversion process preserves the original program logic and control flow, ensuring no functional disruptions. The plugin is designed with flexibility in mind, offering a range of optional parameters to tailor its behavior to specific project needs. Developers can configure which feature groups to replace and exclude certain files from the transformation process.

It provides robust support for a variety of syntaxes, including vanilla ECMAScript, popular JavaScript frameworks, and JSX/TSX syntax.

### Installation with npm

`npm install --save-dev rollup-plugin-ternary-replacement`

### Installation with yarn

`yarn add --dev rollup-plugin-ternary-replacement`

### Importing

```js
import replace from "rollup-plugin-ternary-replacement";
```

### Importing types

```js
import type { PluginOptions } from "rollup-plugin-ternary-replacement/types";
```

## Table of contents

- [Simple example](#simple-example)
- [Example with config](#example-with-config)
- [Config list](#config-list)
- [License](#license)

## Simple example

Replacing all admissible features with ternary operators.

```js
import replace from "rollup-plugin-ternary-replacement";

export default [
  input: "./index.js",
  output: [
    {
      file: "./dist/index.js",
      format: "es",
    },
  ],
  plugins: [replace()],
];
```

Example code input/output:

```js
const testFunction = () => {
  let testVariable1 = 100;
  let testVariable2 = 110;
  let testVariable3 = 120;
  let testVariable4 = 130;
  let testVariable5 = 140;
  let nullVariable = null;

  testVariable1 = nullVariable ?? testVariable2;
  testVariable2 &&= testVariable3;
  testVariable3 ||= testVariable4;
  testVariable4 ??= testVariable5;

  return {
    testVariable1,
    testVariable2,
    testVariable3,
  };
};

export default testFunction;
```

```js
const testFunction = () => {
  let testVariable1 = 100;
  let testVariable2 = 110;
  let testVariable3 = 120;
  let testVariable4 = 130;
  let testVariable5 = 140;
  testVariable1 = testVariable2;
  testVariable3 ? (testVariable3 = testVariable4) : false;
  testVariable4 !== null && testVariable4 !== undefined
    ? (testVariable4 = testVariable5)
    : false;
  return {
    testVariable1,
    testVariable2,
    testVariable3,
  };
};

export { testFunction as default };
```

## Example with config

Replacing only logical assignments with ternary operators in particular files.

```js
import replace from "rollup-plugin-ternary-replacement";

const config = {
  exclude: ["excess-file.js"],
  assignmentsOnly: true,
};

export default [
  input: "./index.js",
  output: [
    {
      file: "./dist/index.js",
      format: "es",
    },
  ],
  plugins: [replace(config)],
];
```

## Config list

| Config name           | Config type | Config appointment                                                         | Config values |
| --------------------- | ----------- | -------------------------------------------------------------------------- | ------------- |
| **exclude**           | Array       | List of file/directory patterns that should be excluded from plugin launch | &mdash;       |
| **excludeExtentions** | Array       | List of file extensions that should be excluded from plugin launch         | &mdash;       |
| **includeSourceMap**  | Boolean     | Enable source map flag                                                     | &mdash;       |
| **nonNullMergesOnly** | Boolean     | Transform assignments disable flag                                         | &mdash;       |
| **assignmentsOnly**   | Boolean     | Transform non-null merges disable flag                                     | &mdash;       |

## License

[MIT](LICENSE)
