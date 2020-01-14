import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'scripts/makePicture.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'frameDataPic',
    sourcemap: 'true'
  },
  browser: true,
  plugins: [resolve(), commonjs()]
}