const path = require('path');
const htmlParser = new (require('./htmlParser'))();
const fileManager = new (require('./fileManager'))();

describe('HTML parser', () => {
  const HTML_FILE_PATH = path.join(__dirname, '../test_data/index.html');
  const rawPaths = htmlParser.findPathesInHtml(HTML_FILE_PATH);
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
    RAW_PATHES: {
      CSS: [
        'background-color.css',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        'letter-spacing.css',
        'text-color.css',
        'text-size.css',
        'center-text.css'
      ],
      JS: [
        'consoleLog1.js',
        'consoleLog2.js',
        'consoleLog3.js'
      ]
    }
  };

  test('Should find and parse CSS and JS paths', () => {
    expect(rawPaths).toEqual(MOCK.RAW_PATHES);
  });

  test('Should find CSS paths', () => {
    const html = fileManager.readFile(HTML_FILE_PATH);
    const cssPaths = htmlParser.findPathesBetween(html, TAGS_CONFIG.CSS.start, TAGS_CONFIG.CSS.end);
    expect(cssPaths).toEqual(MOCK.RAW_PATHES.CSS);
  });

  test('Should find JS paths', () => {
    const html = fileManager.readFile(HTML_FILE_PATH);
    const jsPaths = htmlParser.findPathesBetween(html, TAGS_CONFIG.JS.start, TAGS_CONFIG.JS.end);
    expect(jsPaths).toEqual(MOCK.RAW_PATHES.JS);
  });

});
