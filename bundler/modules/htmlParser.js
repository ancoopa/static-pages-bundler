const FileManager = require('./fileManager');
const SearchTextHelper = require('./searchTextHelper');

// TODO: make customizable
const TAGS_CONFIG = {
  CSS: {
    start: '<!-- Bundler CSS start -->',
    end: '<!-- Bundler CSS end -->'
  },
  JS: {
    start: '<!-- Bundler JS start -->',
    end: '<!-- Bundler JS end -->'
  }
}

class HtmlParser {
  constructor(
    tagsConfig = TAGS_CONFIG,
    fileManager = new FileManager(),
    searchTextHelper = new SearchTextHelper()
  ) {
    this.fileManager = fileManager;
    this.searchTextHelper = searchTextHelper;
    this.tags = tagsConfig;
  }

  findPathesInHtml(htmlFilePath) {
    const htmlData = this.fileManager.readFile(htmlFilePath);
    const result = {};
    Object.keys(this.tags).forEach((type)=> {
      result[type] = this.findPathesBetween(htmlData, this.tags[type].start, this.tags[type].end);
    });
    return result;
  }

  findPathesBetween(htmlData, startTag, endTag) {
    const textBetween = this.searchTextHelper.findTextBetweenTags(htmlData, startTag, endTag);
    return this.searchTextHelper.findTextBetweenAll(textBetween, `[href|src]=['|"]`, `['|"]`);
  }

  findAndReplacePathesBetween(htmlData, startTag, endTag, type) {
    const tags = {
      CSS: '<link rel="stylesheet" href="bundle.css">',
      JS: '<script src="bundle.js" defer></script>'
    }
    const textBetween = this.searchTextHelper.findTextBetweenTags(htmlData, startTag, endTag);
    htmlData.replace(`${startTag}${textBetween}${endTag}`, tags[type]);
    return htmlData.replace(`${startTag}${textBetween}${endTag}`, tags[type]);
  }

  replaceSources(htmlData) {
    Object.keys(this.tags).forEach((type)=> {
      htmlData = this.findAndReplacePathesBetween(htmlData, this.tags[type].start, this.tags[type].end, type);
    });
    return htmlData;
  }

};

module.exports = HtmlParser;
