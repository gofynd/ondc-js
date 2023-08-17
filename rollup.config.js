import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import bundleSize from "rollup-plugin-bundle-size";

export default {
  input: "src/index.ts",
  output: [
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
    bundleSize(),
  ],
  external: ["axios", "libsodium-wrappers", "uuid", "url-join", "express"],
};
