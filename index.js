#!/usr/bin/env node
const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');
const Bundler = require('./bundler');

const PATH_CONFIG = {
  HTML: 'index.html',
  DIST: 'dist',
  ASSETS: 'assets',
  CSS: 'css',
  JS: 'js'
};

const TAG_CONFIG = {
  CSS: {
    START: 'css',
    END: '/css'
  },
  JS: {
    START: 'js',
    END: '/js'
  }
};

const parser = new ArgumentParser({
  description: 'Static Pages Bundler'
});
 
parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-i', '--html', { help: 'The index html file path', default: PATH_CONFIG.HTML });
parser.add_argument('-d', '--dist', { help: 'The final dist/build folder path', default: PATH_CONFIG.DIST });
parser.add_argument('-a', '--assets', { help: 'The assets folder path', default: PATH_CONFIG.ASSETS });
parser.add_argument('-c', '--css', { help: 'The css folder path', default: PATH_CONFIG.CSS });
parser.add_argument('-j', '--js', { help: 'The js folder path', default: PATH_CONFIG.JS });
parser.add_argument('-tsj', '--tag-start-js', { help: 'The js start tag', default: TAG_CONFIG.JS.START });
parser.add_argument('-tej', '--tag-end-js', { help: 'The js end tag', default: TAG_CONFIG.JS.START });
parser.add_argument('-tsc', '--tag-start-css', { help: 'The css start tag', default: TAG_CONFIG.CSS.START });
parser.add_argument('-tec', '--tag-end-css', { help: 'The css end tag', default: TAG_CONFIG.CSS.START });
 
const bundler = new Bundler(PATH_CONFIG, TAG_CONFIG);
bundler.create();