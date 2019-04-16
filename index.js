// npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony
const path = require('path');
const fs = require('fs');
const uglifycss = require('uglifycss');
const UglifyJS = require("uglify-es");
const ncp = require('ncp').ncp;ncp.limit = 16;
const minify = require('html-minifier').minify;

const NAMES = {
  SHARED: 'SHARED',
  LANDING: 'LANDING',
  PAYMENT: 'PAYMENT',
  COPY: 'COPY'
}

const BUNDLE_SCHEMA = {
  [NAMES.COPY]: {
    input: path.join(__dirname, '../kings_day/assets'),
    output: path.join(__dirname, './dist/assets')
  },
  [NAMES.LANDING]: {
    html: {
      input: path.join(__dirname, './source_landing.html'),
      output: path.join(__dirname, './dist/landing.html'),
    },
    css: {
      files: [
        path.join(__dirname, '../kings_day/css/shared/reset.css'),
        path.join(__dirname, '../kings_day/css/shared/variables.css'),
        path.join(__dirname, '../kings_day/css/shared/fonts.css'),
        path.join(__dirname, '../kings_day/css/shared/typography.css'),
        path.join(__dirname, '../kings_day/css/shared/buttons.css'),
        path.join(__dirname, '../kings_day/css/shared/wave.css'),
        path.join(__dirname, '../kings_day/css/landing/landing.css'),
      ],
      output: path.join(__dirname, './dist/css/landing/bundle.css')
    },
    js: {
      files: [
        path.join(__dirname, '../kings_day/js/landing/wavesManager.js'),
        path.join(__dirname, '../kings_day/js/landing/index.js'),
      ],
      output: path.join(__dirname, './dist/js/landing/bundle.js')
    } 
  },
  [NAMES.PAYMENT]: {
    html: {
      input: path.join(__dirname, './source_index.html'),
      output: path.join(__dirname, './dist/index.html'),
    },
    css: {
      files: [
        path.join(__dirname, '../kings_day/css/shared/reset.css'),
        path.join(__dirname, '../kings_day/css/shared/variables.css'),
        path.join(__dirname, '../kings_day/css/shared/fonts.css'),
        path.join(__dirname, '../kings_day/css/shared/typography.css'),
        path.join(__dirname, '../kings_day/css/shared/buttons.css'),
        path.join(__dirname, '../kings_day/css/shared/wave.css'),
        path.join(__dirname, '../kings_day/css/payment/loader.css'),
        path.join(__dirname, '../kings_day/css/payment/payment.css'),
      ],
      output: path.join(__dirname, './dist/css/payment/bundle.css')
    },
    js: {
      files: [
        path.join(__dirname, '../kings_day/js/payment/config.js'),
        path.join(__dirname, '../kings_day/js/payment/stateManager.js'),
        path.join(__dirname, '../kings_day/js/payment/loader.js'),
        path.join(__dirname, '../kings_day/js/payment/networking.js'),
        path.join(__dirname, '../kings_day/js/payment/index.js'),
      ],
      output: path.join(__dirname, './dist/js/payment/bundle.js')
    } 
  },
}

class Bundler {
  constructor(schema) {
    this.schema = schema;
    this.createBundle();
  }

  readSaveFileData(filePathsList) {
    let fullData = '';
    filePathsList.forEach((filePath) => {
      fullData = fullData + this.readFile(filePath);
    });
    return fullData;
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch(err) {
      throw err;
    }
  }

  createWriteFile(data, filePath) {
    return fs.writeFile(filePath, data, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${filePath} file created.`);
    });
  }

  uglifyCss(data) {
    return uglifycss.processString(data);
  }

  uglifyJs(data) {
    const result = UglifyJS.minify(data);
    if (result.error) {
      return console.error('Uglify error: ', result.error)
    }
    return result.code;
  }

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

  copyDir(source, destination) {
    return ncp(source, destination, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${source} folder copied to ${destination}`);
    });
  }

  processBundleUnit(filesPathsList, outputPath, uglifyMethod) {
    const data = this.readSaveFileData(filesPathsList);
    const uglifiedData = uglifyMethod(data);
    return this.createWriteFile(uglifiedData, outputPath);
  }
  processBundleHtmlUnit(htmlFileSource, htmlFileDestination) {
    const htmlData = this.readFile(htmlFileSource);
    const minifiedData = this.uglifyHtml(htmlData);
    return this.createWriteFile(minifiedData, htmlFileDestination);
  }

  removeWhiteSpaces(str) {
    return str
      .replace(/(\r\n|\n|\r)/gm,"") // line breaks
      .replace(/\s/g,' '); // spaces
  }

  createBundle() {
    Object.keys(this.schema)
      .forEach((name) => {
        if (name === NAMES.COPY) {
          return this.copyDir(this.schema[name].input, this.schema[name].output);
        }
        this.processBundleHtmlUnit(
          this.schema[NAMES[name]].html.input,
          this.schema[NAMES[name]].html.output,
        );
        this.processBundleUnit(
          this.schema[NAMES[name]].css.files,
          this.schema[NAMES[name]].css.output,
          this.uglifyCss
        );
        this.processBundleUnit(
          this.schema[NAMES[name]].js.files,
          this.schema[NAMES[name]].js.output,
          this.uglifyJs
        );
      });
  }
}

const bundler = new Bundler(BUNDLE_SCHEMA);
