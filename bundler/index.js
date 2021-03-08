const FileManager = require('./modules/fileManager');
const Uglifier = require('./modules/uglifier');
const HtmlParser = require('./modules/htmlParser');

class Bundler {
  constructor(
    pathConfig,
    tagConfig,
  ) {
    this.pathConfig = pathConfig;
    this.tagConfig = tagConfig;
    this.fileManager = new FileManager();
    this.uglifier = new Uglifier();
    this.htmlParser = new HtmlParser(tagConfig);
  }

  async create() {
    try {
      this._logBundleStarting();
      this._dist();
      this._assets();
      const htmlPath = this.pathConfig.HTML;
      const htmlData = await this.fileManager.readAggregateFilesData(htmlPath);
      if (!htmlData) {
        this._logFileNotCreated(htmlPath);
        throw `File not created ${htmlPath}`;
      }
      const cssBundleName = await this._css(htmlData);
      const jsBundleName = await this._js(htmlData);
      await this._html(htmlData, htmlPath, cssBundleName, jsBundleName);
      this._logBundleFinished();
    } catch(error) {
      console.log(error);
      this._removeDistFolder();
      this._logBundleFailed();
    }
  }

  _logBundleStarting() {
    console.log(`⌛ Starting Bundle for ${this.pathConfig.HTML}`)
  }

  _logFileNotCreated(filePath) {
    console.log(`🚫 ${filePath}`);
  }

  _logFileNotFound(filePath) {
    console.log(`❓ ${filePath}`);
  }

  _logFileCreated(filePath) {
    console.log(`📁 ${filePath} ✓`)
  }

  _logBundleFinished() {
    console.log(`✅ Finished Bundle for ${this.pathConfig.HTML} → ${this.pathConfig.DIST}`)
  }

  _logBundleFailed() {
    console.log(`❌ Failed Bundle ${this.pathConfig.HTML}`)
  }

  _removeDistFolder() {
    this.fileManager.removeFolder(this.pathConfig.DIST);
  }

  _write(data, uglifier, filePath) {
    if (this.fileManager.createWriteFile(uglifier(data), filePath)) this._logFileCreated(filePath);
    else this._logFileNotCreated(filePath);
  }

  _dist() {
    const filePath = this.pathConfig.DIST;
    this.fileManager.overwriteFolder(filePath);
    this._logFileCreated(filePath);
  }

  _assets() {
    const folder = this.pathConfig.FOLDER;
    const assets = this.pathConfig.ASSETS;
    const from = assets;
    const dist = this.pathConfig.DIST;
    const to = `${dist}`;
    const filePath = `${dist}/${from.replace(folder, '')}`;
    if (this.fileManager.copyFolderRecursiveSync(from, to)) this._logFileCreated(filePath);
    else this._logFileNotCreated(filePath);
  }

  async _src(html, tag, uglifier, name) {
    const paths = this.htmlParser.findPathsInHtml(html, tag);
    const filePath = `${this.pathConfig.DIST}/${name}`;
    if (!paths.length) {
      this._logFileNotCreated(filePath);
      return null;
    }
    const folder = this.pathConfig.FOLDER;
    if (folder) {
      paths.forEach((path, index) => {
        paths[index] = `${folder}${path}`;
      })
    }
    const data = await this.fileManager.readAggregateFilesData(paths, false, (path) => this._logFileNotFound(path));
    if (!data) {
      this._logFileNotCreated(filePath);
      return null;
    }
    this._write(data, uglifier, filePath);
    return name
  }

  async _html(htmlData, htmlPath, cssBundleName, jsBundleName) {
    const split = htmlPath.split('/');
    const htmlFileName = split[split.length - 1];
    const html = await this.htmlParser.replaceSources(htmlData, cssBundleName, jsBundleName);
    this._write(html, this.uglifier.uglifyHtml, `${this.pathConfig.DIST}/${htmlFileName}`);
  }

  async _css(html) {
    return await this._src(html, this.tagConfig.CSS, this.uglifier.uglifyCss, 'bundle.css');
  }

  async _js(html) {
    return await this._src(html, this.tagConfig.JS, this.uglifier.uglifyJs, 'bundle.js');
  }

};

module.exports = Bundler;
