const FileManager = require('./fileManager');

// TODO: make customizable
const TAGS_CONFIG = {
  CSS: {
    start: '<!-- Bundler CSS start -->',
    end: '<!-- Bundler CSS end -->'
  },
  // JS: {
  //   start: '<!-- Bundler JS start -->',
  //   end: '<!-- Bundler JS end -->'
  // }
}

class HtmlParser {
  constructor(tagsConfig = TAGS_CONFIG, fileManager = new FileManager()) {
    this.fileManager = fileManager;
    this.tags = tagsConfig;
  }

  findPathesInHtml(htmlFilePath) {
    const htmlData = this.fileManager.readFile(htmlFilePath);

    const result = {};
    Object.keys(this.tags).forEach((type)=> {
      result[type] = this.findPathesBetween(htmlData, this.tags[type].start, this.tags[type].end);
    });
    console.log(result)
    return result;
  }

  findPathesBetween(htmlData, startTag, endTag) {
    const textBetween = this.findTextBetweenTags(htmlData, startTag, endTag);

    console.log('~~~~~~~~~~~~~textBetween: ', textBetween)
  }

  findTextBetweenTags(text, startTag, endTag) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', text)
    const textPiece = text.match(new RegExp(startTag + '(.*)' + endTag));
    if (textPiece) {
      return textPiece[1];
    }
    return // ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
};

const htmlParser = new HtmlParser();

const path = require('path');
const htmlFilePath = path.join(__dirname, './index.html');

htmlParser.findPathesInHtml(htmlFilePath);
