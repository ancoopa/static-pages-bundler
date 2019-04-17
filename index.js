// npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony
const Bundler = require('./bundler');

const path = require('path');
const htmlFilePath = path.join(__dirname, './index.html');

const bundler = new Bundler();
bundler.createBundle(htmlFilePath);
