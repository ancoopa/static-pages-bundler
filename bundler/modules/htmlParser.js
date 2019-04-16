function getBetweenTags(text, startTag, endTag) {
  return text.match(new RegExp(startTag + "(.*)" + endTag))[1];
}
