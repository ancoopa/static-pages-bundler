#!/usr/bin/env node
// npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony
const bundler = require('./bundler');

const args = process.argv.slice(2)
/** Args
 * args[0] -- html file path
 * TODO: args[1] -- assets folder path
 * TODO: args[2] -- assets folder restination path
 * TODO: args[3] -- custom CSS tags
 * TODO: args[4] -- custom JS tags
 */

let htmlFilePath = '';
if (args.length === 0) {
  htmlFilePath = './index.html';
} else {
  const argPath = args[0];
  htmlFilePath = argPath;
}

bundler.createBundle(htmlFilePath);
