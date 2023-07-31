import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/ondc-js.umd.js",
      format: "umd",
      name: "ONDCjs",
    },
    {
      file: "dist/ondc-js.cjs.js",
      format: "cjs",
      exports: "auto",
    },
    {
      file: "dist/ondc-js.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({}),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
  ],
  external: ["axios"],
};
