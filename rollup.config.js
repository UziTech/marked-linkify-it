import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'markedLinkifyIt',
      file: 'lib/index.umd.js',
      format: 'umd'
    },
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs'
    },
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  }
];
