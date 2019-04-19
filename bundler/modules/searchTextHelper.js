class SearchTextHelper {
  findTextBetweenTags(text, startTag, endTag) {
    const textPiece = text.match(new RegExp(`${startTag}([^]*?)${endTag}`), 'm');
    if (textPiece !== null) {
      return textPiece[1];
    }
    throw new Error(`Something went wrong during finding text between tags. Please, make sure you have both <!-- Bundler CSS ... --> and <!-- Bundler JS ... --> comment line sets in your template.`);
  }

  findTextBetweenAll(text, startTag, endTag) {
    const textPiece = this.matchAll(text, new RegExp(`${startTag}([^]*?)${endTag}`));
    if (textPiece !== null) {
      return textPiece;
    }
    throw new Error(`Something went wrong during finding text between tags. Please, make sure you have both <!-- Bundler CSS ... --> and <!-- Bundler JS ... --> comment line sets in your template.`);
  }

  matchAll(text, regex) {
    const result = [];
    let match = regex.exec(text);
    result.push(match[1]);
    while (match !== null) {
      if (result.indexOf(match[1]) === -1) {
        result.push(match[1])
      };
      text = text.replace(match[0], '');
      match = regex.exec(text);
    }
    return result;
  }
}

module.exports = SearchTextHelper;
