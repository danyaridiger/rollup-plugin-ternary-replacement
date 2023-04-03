import escodegen from "escodegen";
import JSXParser from "../modules/jsx-parser";
import parserOptions from "../modules/parser-options";

/**
 * Transforms given code replacing non-null 
 * merge operators with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @returns {string} code
 */
export default function convertNonNullMerge(fragment) {
  const identifier = fragment.left.raw || fragment.left.name;
  const finalString = `${identifier} !== null && ${identifier} !== undefined`;
  const fragmentToReplace = JSXParser.parse(finalString, parserOptions);
  const newFragment = escodegen.generate({
    type: "ConditionalExpression",
    test: fragmentToReplace,
    consequent: fragment.left,
    alternate: fragment.right,
  });
  
  return newFragment.replace(";", "");
}