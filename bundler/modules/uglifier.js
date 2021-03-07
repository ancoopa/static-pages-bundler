const minify = require('html-minifier').minify;
const uglifycss = require('uglifycss');
const UglifyJS = require("uglify-es");

class Uglifier {
  uglifyHtml(data) {
    return minify(data, {
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    });
  }

  uglifyCss(data) {
    return uglifycss.processString(data);
  }

  uglifyJs(data) {
    const result = UglifyJS.minify(data);
    if (result.error) {
      console.error('Uglify error: ', result.error);
      return data;
    }
    return result.code;
  }

};

module.exports = Uglifier;
