import walk from 'estree-visitor';
import MagicString from 'magic-string';
import { extname } from 'path';
import { createFilter } from '@rollup/pluginutils';
import jsx from 'acorn-jsx';
import * as acorn from 'acorn';
import escodegen from 'escodegen';

/**
 * Code parser extended by jsx plugin
 * @constant {acorn.Parser} JSXParser
 */
var JSXParser = acorn.Parser.extend(jsx());

/**
 * @typedef {object} Plugins
 * @property {boolean} jsx - jsx syntax flag
 */

/**
 * @type {object}
 * @property {boolean} allowReserved - reserved keyword restriction flag
 * @property {boolean} allowImportExportEverywhere - esm operator restriction flag
 * @property {boolean} allowHashBang - hashbang comments restriction flag
 * @property {number} ecmaVersion - ECMAScript version
 * @property {string} sourceType - source program type
 * @property {Plugins} plugins - plugin options
 */
var parserOptions = {
  allowReserved: true,
  allowImportExportEverywhere: true,
  allowHashBang: true,
  ecmaVersion: 13,
  sourceType: 'module',
  plugins: {
    jsx: true
  }
};

/**
 * Transforms given code replacing non-null 
 * merge operators with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @returns {string} code
 */
function convertNonNullMerge(fragment) {
  const identifier = fragment.left.raw || fragment.left.name;
  const finalString = `${identifier} !== null && ${identifier} !== undefined`;
  const fragmentToReplace = JSXParser.parse(finalString, parserOptions);
  const newFragment = escodegen.generate({
    type: "ConditionalExpression",
    test: fragmentToReplace,
    consequent: fragment.left,
    alternate: fragment.right
  });
  return newFragment.replace(";", "");
}

/**
 * Transforms given code replacing non-null 
 * merge assignments with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @returns {string} code
 */
function convertMergeAssignment(fragment) {
  const identifier = fragment.left.raw || fragment.left.name;
  const appropriator = fragment.right.raw || fragment.right.name;
  const finalString = `
    ${identifier} !== null && ${identifier} !== undefined 
     ? ${identifier} = ${appropriator} 
     : false`;
  const fragmentToReplace = JSXParser.parse(finalString, parserOptions);
  const expression = fragmentToReplace.body[0].expression;
  const newFragment = escodegen.generate(expression);
  return newFragment;
}

/**
 * Transforms given code replacing logical 
 * assignments with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @param {boolean} [additionAssignment=false] - addition assignment operator flag
 * @returns {string} code
 */
function convertLogicalAssignment(fragment, additionAssignment = false) {
  const identifier = fragment.left.raw || fragment.left.name;
  const appropriator = fragment.right.raw || fragment.right.name;
  let finalString = `${identifier} ? ${identifier} = ${appropriator} : false`;
  finalString = additionAssignment ? finalString : `!${finalString}`;
  const fragmentToReplace = JSXParser.parse(finalString, parserOptions);
  const expression = fragmentToReplace.body[0].expression;
  const newFragment = escodegen.generate(expression);
  return newFragment;
}

/**
 * Local Error instance
 * @class
 * @extends Error
 */
class RollupPluginTernaryReplacementError extends Error {}

/**
 * @typedef {object} Options
 * @property {Array} [exclude] - list of file/directory patterns that should be excluded from plugin launch
 * @property {Array} [excludeExtentions] - list of file extensions that should be excluded from plugin launch
 * @property {boolean} [includeSourceMap] - enable source map flag
 * @property {boolean} [nonNullMergesOnly] - transform assignments disable flag
 * @property {boolean} [assignmentsOnly] - transform non-null merges disable flag
 */

/**
 * @typedef {object} Transform
 * @method transform - transforms given code fragment from each file
 */

/**
 * @typedef {object} TransformResult
 * @property {string} code - transformed code
 * @property {SourceMap} map - transformed source map
 */

/**
 * Transforms source code according to options requirements
 * @author Ridiger Daniil Dmitrievich, 2023
 * @function
 * @param {Options} [options = {}] - plugin options
 * @returns {Transform} transformation
 * @version 0.0.2
 */
module.exports = function rollupPluginTernaryReplacement(options = {}) {
  const exclude = options.exclude ? options.exclude.map(function (path) {
    return new RegExp(path, "i");
  }) : [];
  const include = createFilter([], exclude);
  const excludeExtentions = options.excludeExtentions || [];
  const includeSourceMap = options.includeSourceMap;
  const nonNullMergesOnly = options.nonNullMergesOnly;
  const assignmentsOnly = options.assignmentsOnly;
  return {
    /**
     * Transforms given code fragment from each file
     * @method
     * @param {string} code - code from each file
     * @param {string} path - path to each file
     * @returns {TransformResult} code
     */
    transform: function (code, path) {
      if (excludeExtentions.includes(extname(path).slice(1)) || !include(path)) {
        return null;
      }
      let node;
      try {
        node = JSXParser.parse(code, parserOptions);
      } catch (error) {
        throw new RollupPluginTernaryReplacementError(`${error.message} — thrown in ${path}`);
      }
      const magicString = new MagicString(code);
      walk(node, {
        /**
         * Replaces given nodes with new ones if necessary
         * @method
         * @param {Node} fragment 
         * @returns {MagicString} node
         */
        enter: function (fragment) {
          if (fragment.operator && fragment.operator === "??" && !assignmentsOnly) {
            const newFragment = convertNonNullMerge(fragment);
            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }
          if (fragment.operator && fragment.operator === "&&=" && !nonNullMergesOnly) {
            const newFragment = convertLogicalAssignment(fragment);
            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }
          if (fragment.operator && fragment.operator === "||=" && !nonNullMergesOnly) {
            const newFragment = convertLogicalAssignment(fragment, true);
            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }
          if (fragment.operator && fragment.operator === "??=" && !nonNullMergesOnly) {
            const newFragment = convertMergeAssignment(fragment);
            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }
          return magicString;
        }
      });
      return {
        code: magicString.toString(),
        map: includeSourceMap ? magicString.generateMap() : null
      };
    }
  };
};
//# sourceMappingURL=mjs.js.map
