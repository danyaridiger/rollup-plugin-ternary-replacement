import escodegen from "escodegen";
import JSXParser from "../modules/jsx-parser";
import parserOptions from "../modules/parser-options";

/**
 * Transforms given code replacing non-null 
 * merge assignments with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @returns {string} code
 */
export default function convertMergeAssignment(fragment) {
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