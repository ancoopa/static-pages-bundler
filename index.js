// npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony
const bundler = require('./bundler');
const BUNDLE_SCHEMA = require('./config');

bundler.createBundle(BUNDLE_SCHEMA);
