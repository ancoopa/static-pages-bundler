const SearchTextHelper = require('./searchTextHelper');

class HtmlParser {
  constructor(tagConfig) {
    this.tagConfig = tagConfig;
    this.searchTextHelper = new SearchTextHelper();
  }

  findPathsInHtml(html, tag) {
    return this.findPathsBetween(html, this._wrap(tag.START), this._wrap(tag.END));
  }

  findPathsBetween(htmlData, startTag, endTag) {
    const textBetween = this.searchTextHelper.findTextBetweenTags(htmlData, startTag, endTag);
    if (!textBetween) return [];
    const paths = this.searchTextHelper.findHrefSrcBetweenAll(textBetween);
    if (!paths) return [];
    return paths;
  }

  findAndReplacePathsBetween(htmlData, startTag, endTag, newTag) {
    const textBetween = this.searchTextHelper.findTextBetweenTags(htmlData, startTag, endTag);
    if (!textBetween) return htmlData;
    return htmlData.replace(`${startTag}${textBetween}${endTag}`, newTag);
  }

  replaceSources(htmlData, cssBundleName, jsBundleName) {
    if (cssBundleName) 
      htmlData = this.findAndReplacePathsBetween(
        htmlData, this._wrap(this.tagConfig.CSS.START), this._wrap(this.tagConfig.CSS.END), `<link rel="stylesheet" href="${cssBundleName}">`);
    if (jsBundleName) 
        htmlData = this.findAndReplacePathsBetween(
          htmlData, this._wrap(this.tagConfig.JS.START), this._wrap(this.tagConfig.JS.END), `<script src="${jsBundleName}" defer></script>`);
    return htmlData;
  }

  _wrap(tag) {
    return `<!-- ${tag} -->`;
  }

};

module.exports = HtmlParser;
