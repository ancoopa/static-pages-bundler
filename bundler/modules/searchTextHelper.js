class SearchTextHelper {
  findTextBetweenTags(text, startTag, endTag) {
    const textPiece = text.match(new RegExp(`${startTag}([^]*?)${endTag}`), 'm');
    if (textPiece !== null) {
      return textPiece[1];
    }
    throw new Error(`Something went wrong during finding text between tags. Please, make sure you have both <!-- Bundler CSS ... --> and <!-- Bundler JS ... --> comment line sets in your template.`);
  }

  findHrefSrcBetweenAll(text) {
    const patternHrefSrc = /(?:href|src)=(["'])([^]*?)(?:'|")/g;
    const textPiece = this.matchAll(text, patternHrefSrc);
    if (textPiece !== null) {
      return textPiece;
    }
    throw new Error(`Something went wrong during finding text between tags. Please, make sure you have both <!-- Bundler CSS ... --> and <!-- Bundler JS ... --> comment line sets in your template.`);
  }

  matchAll(text, regex) {
    const result = [];
    let match = regex.exec(text);
    result.push(match[2]);

    while (match !== null) {
      if (result.indexOf(match[2]) === -1) {
        result.push(match[2])
      };
      text = text.replace(match[0], '');
      match = regex.exec(text);
    }
    return result;
  }
}

module.exports = SearchTextHelper;
