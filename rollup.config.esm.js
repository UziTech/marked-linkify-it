import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'lib/marked-linkify-it.esm.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
