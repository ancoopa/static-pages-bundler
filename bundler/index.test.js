const bundler = require('./index');
const fileManager = new (require('./modules/fileManager'))();

describe('Main bundler module', () => {
  const TestHtmlFilePath = './bundler/test_data/index.html';
  const MOCK = {
    SCHEMA: {
      CSS: {
        input: [
          'background-color.css',
          'letter-spacing.css',
          'text-color.css',
          'text-size.css',
          'center-text.css'
        ],
        output: 'dist/bundle.css'
      },
      JS: {
        input: [
          'consoleLog1.js',
          'consoleLog2.js',
          'consoleLog3.js'
        ],
        output: 'dist/bundle.js'
      },
      HTML: {
        input: [
          './bundler/test_data/index.html'
        ],
        output: 'dist/index.html'
      }
    },

    SCHEMA_CUSTOM_OUTPUT: {
      CSS: {
        input: [
          'bundler/test_data/background-color.css',
          'bundler/test_data/letter-spacing.css',
          'bundler/test_data/text-color.css',
          'bundler/test_data/text-size.css',
          'bundler/test_data/center-text.css'
        ],
        output: 'bundler/test_data/dist/bundle.css'
      },
      JS: {
        input: [
          'bundler/test_data/consoleLog1.js',
          'bundler/test_data/consoleLog2.js',
          'bundler/test_data/consoleLog3.js'
        ],
        output: 'bundler/test_data/dist/bundle.js'
      },
      HTML: {
        input: [
          'bundler/test_data/index.html'
        ],
        output: 'bundler/test_data/dist/bundle.html'
      }
    },

    BUNDLE_CUSTOM_SCHEMA: {
      HTML: `
        <!doctype html><html lang="en"><head><meta charset="utf-8"><title>The HTML5</title><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="author" content="“ancoopa”"><link rel="stylesheet" href="bundle.css"><!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]--><script src="bundle.js" defer="defer"></script></head><body><div>My beautiful text.</div></body></html>
      `,
      CSS: `div{background-color:green}div{letter-spacing:20px}div{color:orange}div{font-size:30px}div{text-align:center}`,
      JS: `console.log("1"),console.log("2"),console.log("3");`
    }

  };

  function checkBundleFromCustomSchemaMock() {
    // Get folder files
    const htmlBundlePath = MOCK.SCHEMA_CUSTOM_OUTPUT.HTML.output;
    const cssBundlePath = MOCK.SCHEMA_CUSTOM_OUTPUT.CSS.output;
    const jsBundlePath = MOCK.SCHEMA_CUSTOM_OUTPUT.JS.output;
    
    // Read files;
    const htmlData = fileManager.readFile(htmlBundlePath);
    const cssData = fileManager.readFile(cssBundlePath);
    const jsData = fileManager.readFile(jsBundlePath);

    // Compare with mock result
    expect(htmlData.trim()).toEqual(MOCK.BUNDLE_CUSTOM_SCHEMA.HTML.trim());
    expect(cssData.trim()).toEqual(MOCK.BUNDLE_CUSTOM_SCHEMA.CSS.trim());
    expect(jsData.trim()).toEqual(MOCK.BUNDLE_CUSTOM_SCHEMA.JS.trim());
  }
  
  function clearDistFolder() {
    const fs = require('fs');
    const path = require('path');

    const split = MOCK.SCHEMA_CUSTOM_OUTPUT.HTML.output.split('/');
    split.splice(-1,1);
    const directory = split.join('/');

    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  };

  test('Has fileManager prop', () => {
    expect(bundler.fileManager).toMatchObject(expect.any(Object));
  });

  test('Has uglifier prop', () => {
    expect(bundler.uglifier).toMatchObject(expect.any(Object));
  });

  test('Has htmlParser prop', () => {
    expect(bundler.htmlParser).toMatchObject(expect.any(Object));
  });

  test('Creates a proper schema from file', () => {
    const schema = bundler.createSchema(TestHtmlFilePath);
    expect(schema).toEqual(MOCK.SCHEMA);
  });

  test('Creates a proper bundle', () => {
    bundler.createBundle(TestHtmlFilePath, MOCK.SCHEMA_CUSTOM_OUTPUT);
    checkBundleFromCustomSchemaMock();
    clearDistFolder();
  });

});
