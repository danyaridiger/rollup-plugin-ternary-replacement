import { rollup } from "rollup";
import replace from "../../index";

/**
 * Mocks rollup build with rollup-plugin-ternary-replacement
 * @function
 * @param {Options} options
 * @returns {string} - code
 */
export default async function createOutput(options = {}) {
  const dist = await rollup({
    input: "./tests/tools/example.js",
    plugins: [replace(options)],
  });

  const exclude = await rollup({
    input: "./tests/tools/exclude.js",
    plugins: [replace(options)],
  });

  const code = await dist.generate({ 
    format: "es",
  });
  const excludeCode = await exclude.generate({
    format: "es",
  });

  return `${code.output[0].code}\r\n${excludeCode.output[0].code}`;
}