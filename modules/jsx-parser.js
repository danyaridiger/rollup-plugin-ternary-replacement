import jsx from "acorn-jsx";
import * as acorn from "acorn";

/**
 * Code parser extended by jsx plugin
 * @constant {acorn.Parser} JSXParser
 */
export default acorn.Parser.extend(jsx());