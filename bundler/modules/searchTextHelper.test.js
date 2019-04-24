const path = require('path');
const searchTextHelper = new (require('./searchTextHelper'))();
const fileManager = new (require('./fileManager'))();

describe('Search text helper', () => {
  const HTML_FILE_PATH = path.join(__dirname, '../test_data/index.html');
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
  const MOCK = {
    CSS_TEXT: `
  <link type="text/css" rel="stylesheet" href="background-color.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="letter-spacing.css" type="text/css">
  <link rel="stylesheet" href="text-color.css">
  <link rel="stylesheet" href="text-size.css">
  <link rel="stylesheet" href="center-text.css">
  `,

    JS_TEXT: `
  <script type="application/javascript" src="consoleLog1.js" defer></script>
  <script src="consoleLog2.js" type="application/javascript" defer></script>
  <script src="consoleLog3.js" defer></script>
  `
  };

  test('Should find CSS scripts', () => {
    const html = fileManager.readFile(HTML_FILE_PATH);
    const cssText = searchTextHelper.findTextBetweenTags(html, TAGS_CONFIG.CSS.start, TAGS_CONFIG.CSS.end);
    expect(cssText.trim()).toBe(MOCK.CSS_TEXT.trim());
  });

  test('Should find JS scripts', () => {
    const html = fileManager.readFile(HTML_FILE_PATH);
    const jsText = searchTextHelper.findTextBetweenTags(html, TAGS_CONFIG.JS.start, TAGS_CONFIG.JS.end);
    expect(jsText.trim()).toBe(MOCK.JS_TEXT.trim());
  });

});
