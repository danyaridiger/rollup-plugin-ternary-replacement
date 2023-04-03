import walk from "estree-visitor";
import MagicString from "magic-string";
import { extname } from "path";
import { createFilter } from "@rollup/pluginutils";
import JSXParser from "./modules/jsx-parser.js";
import parserOptions from "./modules/parser-options";
import convertNonNullMerge from "./transforms/convert-non-null-merge.js";
import convertMergeAssignment from "./transforms/convert-merge-assignment.js";
import convertLogicalMultiplyAssignment from "./transforms/convert-logical-multiply-assignment.js";
import RollupPlaginTernaryReplacementError from "./modules/RollupPluginTernaryReplacementError.js";

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
 * @version 0.0.1
 */
module.exports = function rollupPluginTernaryReplacement(options = {}) {
  const exclude = options.exclude ? options.exclude.map((path) => new RegExp(path, "i")) : [];
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
    transform: (code, path) => {
      if (excludeExtentions.includes(extname(path).slice(1)) || !include(path)) {
        return null;
      }

      let node;

      try {
        node = JSXParser.parse(code, parserOptions);
      } catch(error) {
        throw new RollupPlaginTernaryReplacementError(`${error.message} — thrown in ${path}`);
      }

      const magicString = new MagicString(code);

      walk(node, {
        /**
         * Replaces given nodes with new ones if necessary
         * @method
         * @param {Node} fragment 
         * @returns {MagicString} node
         */
        enter: (fragment) => {
          if (fragment.operator && fragment.operator === "??" && !assignmentsOnly) {
            const newFragment = convertNonNullMerge(fragment);

            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }

          if (fragment.operator && fragment.operator === "&&=" && !nonNullMergesOnly) {
            const newFragment = convertLogicalMultiplyAssignment(fragment);

            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }

          if (fragment.operator && fragment.operator === "||=" && !nonNullMergesOnly) {
            const newFragment = convertLogicalMultiplyAssignment(fragment, true);

            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }

          if (fragment.operator && fragment.operator === "??=" && !nonNullMergesOnly) {
            const newFragment = convertMergeAssignment(fragment);

            magicString.overwrite(fragment.start, fragment.end, newFragment);
          }

          return magicString;
        },
      });

      return {
        code: magicString.toString(),
        map: includeSourceMap ? magicString.generateMap() : null,
      };
    },
  }
}