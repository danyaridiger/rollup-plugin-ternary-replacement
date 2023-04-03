# rollup-plugin-ternary-replacement v0.0.1

***

### Brief annotation
"rollup-plugin-ternary-replacement" is a plugin for popular web-applications builder called "rollup". This plugin can help developers to make their web-applications more compatible by
replacing some of new ECMAScript features such as "??" operator by ternary operators. Replacing will be done automatically if plugin function call have been placed into rollup plugins configuration. Plugin convertion is performed without violating program logic and program flow disruptions. Different optional parameters allow to configurate plugin for developer's own needs. For example, developer can choose specific group of features that should be rapleced, or exclude certain files from conversion process. Plugin works correctly with both vanilla ECMAScript and framework syntax (also included jsx/tsx syntax).

### Installation with npm

``npm install --save-dev rollup-plugin-ternary-replacement``

### Installation with yarn

``yarn add --dev rollup-plugin-ternary-replacement``

### Importing

```js
import replace from "rollup-plugin-ternary-replacement"
```

### Importing types

```js
import rollupPluginTernaryReplacement from "rollup-plugin-ternary-replacement/types"
```

## Table of contents
* [Simple example](#simple-example)
* [Example with config](#example-with-config)
* [Config list](#config-list)
* [License](#license)

## Simple example

Replacing all admissible features with ternary operators.

```js
import replace from "rollup-plugin-ternary-replacement";

export default [
  input: "index.js",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [replace()],
];
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
  input: "index.js",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [replace(config)],
];
```

## Config list
Config name | Config type | Config appointment | Config values
------------|-------------|--------------------|--------------
**exclude**|Array|List of file/directory patterns that should be excluded from plugin launch|&mdash;|
**excludeExtentions**|Array|List of file extensions that should be excluded from plugin launch|&mdash;|
**includeSourceMap**|Boolean|enable source map flag|&mdash;|
**nonNullMergesOnly**|Boolean|transform assignments disable flag|&mdash;|
**assignmentsOnly**|Boolean|transform non-null merges disable flag|&mdash;|

## License

[MIT](LICENSE)