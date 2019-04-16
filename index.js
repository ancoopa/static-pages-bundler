// npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony
const BUNDLE_SCHEMA = require('./config');
const bundler = require('./bundler');

bundler.createBundle(BUNDLE_SCHEMA);
