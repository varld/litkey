import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    external({
      includeDependencies: true,
    }),
    resolve(),
    babel({
      presets: [
        '@babel/preset-env'
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    terser(),
  ],
};