import escodegen from "escodegen";
import JSXParser from "../modules/jsx-parser";
import parserOptions from "../modules/parser-options";

/**
 * Transforms given code replacing logical 
 * assignments with ternary operators
 * @function
 * @param {Node} fragment - code fragment to search in
 * @param {boolean} [additionAssignment=false] - addition assignment operator flag
 * @returns {string} code
 */
export default function convertLogicalAssignment(fragment, additionAssignment = false) {
  const identifier = fragment.left.raw || fragment.left.name;
  const appropriator = fragment.right.raw || fragment.right.name;

  let finalString = `${identifier} ? ${identifier} = ${appropriator} : false`;

  finalString = additionAssignment ? finalString : `!${finalString}`;

  const fragmentToReplace = JSXParser.parse(finalString, parserOptions);
  const expression = fragmentToReplace.body[0].expression;
  const newFragment = escodegen.generate(expression);

  return newFragment;
}