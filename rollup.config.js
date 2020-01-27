import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replaceHtmlVars from 'rollup-plugin-replace-html-vars';

export default {
  input: 'scripts/makePicture.js',
  output: {
    file: 'static/bundle.js',
    format: 'iife',
    name: 'frameDataPic',
    sourcemap: 'true'
  },
  browser: true,
  plugins: [resolve(), commonjs(),
  replaceHtmlVars({
    files: 'static/index.html',
    from: /\${timestamp}/g,
    to: Date.now()
  })]
}