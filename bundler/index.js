const FileManager = require('./modules/fileManager');
const Uglifier = require('./modules/uglifier');
const HtmlParser = require('./modules/htmlParser');

class Bundler {
  constructor(
    fileManager = new FileManager(),
    uglifier = new Uglifier(),
    htmlParser = new HtmlParser()
  ) {
    this.fileManager = fileManager;
    this.uglifier = uglifier;
    this.htmlParser = htmlParser;
  }

  async createBundle(htmlFilePath, schema = null) {
    if (!schema) {
      schema = this.createSchema(htmlFilePath);
    }
    // html
    await this.processBundleUnit(
      schema.HTML.input,
      schema.HTML.output,
      this.uglifier.uglifyHtml,
      true
    );
    // css
    await this.processBundleUnit(
      schema.CSS.input,
      schema.CSS.output,
      this.uglifier.uglifyCss
    );
    // js
    await this.processBundleUnit(
      schema.JS.input,
      schema.JS.output,
      this.uglifier.uglifyJs
    );
  }

  createSchema(htmlFilePath) {
    const rawPathes = this.htmlParser.findPathesInHtml(htmlFilePath);
    
    const pathes = {};
    Object.keys(rawPathes).forEach((key) => {
      pathes[key] = {
        input: rawPathes[key],
        output: `dist/bundle.${key.toLowerCase()}`
      };
    });

    const split = htmlFilePath.split('/');
    const htmlFileName = split[split.length - 1];
    pathes.HTML = {
      input: [ htmlFilePath ],
      output: `dist/${htmlFileName}`
    };

    return pathes;
  }

  async processBundleUnit(filesPathsList, outputPath, uglifyMethod, isHtml = false) {
    let data = await this.fileManager.readAggregateFilesData(filesPathsList);
    if (isHtml) {
      data = this.htmlParser.replaceSources(data);
    }
    
    const uglifiedData = uglifyMethod(data);
    return this.fileManager.createWriteFile(uglifiedData, outputPath);
  }
};

module.exports = new Bundler();
