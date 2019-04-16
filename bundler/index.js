const FileManager = require('./modules/fileManager');
const Uglifier = require('./modules/uglifier');

class Bundler {
  constructor(fileManager, uglifier) {
    this.fileManager = fileManager;
    this.uglifier = uglifier;
  }

  createBundle(schema) {
    return Object.keys(schema)
      .forEach((name) => {
        // assets
        if (name === 'COPY') {
          return this.fileManager.copyDir(schema[name].input, schema[name].output);
        }
        // html
        this.processBundleUnit(
          schema[name].html.input,
          schema[name].html.output,
          this.uglifier.uglifyHtml
        );
        // css
        this.processBundleUnit(
          schema[name].css.files,
          schema[name].css.output,
          this.uglifier.uglifyCss
        );
        // js
        this.processBundleUnit(
          schema[name].js.files,
          schema[name].js.output,
          this.uglifier.uglifyJs
        );
      });
  }

  processBundleUnit(filesPathsList, outputPath, uglifyMethod) {
    const data = this.fileManager.readAggregateFilesData(filesPathsList);
    const uglifiedData = uglifyMethod(data);
    return this.fileManager.createWriteFile(uglifiedData, outputPath);
  }
};

module.exports = new Bundler(new FileManager(), new Uglifier());
