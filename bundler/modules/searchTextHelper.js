class SearchTextHelper {
  findTextBetweenTags(text, startTag, endTag) {
    const textPiece = text.match(new RegExp(`${startTag}([^]*?)${endTag}`), 'm');
    if (textPiece !== null) return textPiece[1];
    return null
  }

  findHrefSrcBetweenAll(text) {
    const patternHrefSrc = /(?:href|src)=(["'])([^]*?)(?:'|")/;
    const textPiece = this.matchAll(text, patternHrefSrc);
    return textPiece;
  }

  matchAll(text, regex) {
    const result = [];
    let match = regex.exec(text);
    if (!match || match.length !== 3) return null;
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
