import { babel } from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "index.js",
    output: [
      {
        file: "dist/umd.js",
        format: "umd",
        name: "rollupPluginTernaryReplacement",
        sourcemap: true,
      },
      {
        file: "dist/mjs.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: ["./node_modules/**"],
        plugins: [
          "@babel/plugin-transform-arrow-functions"
        ],
      }),
    ]
  },
  {
    input: "./types/index.d.ts",
    output: [
      {
        file: "dist/types/index.d.ts",
        format: "es",
        sourcemap: false,
      }
    ],
    plugins: [dts()],
  }
];