const path = require('path');

const BUNDLE_SCHEMA = {
  COPY: {
    input: path.join(__dirname, '../kings_day/assets'),
    output: path.join(__dirname, './dist/assets')
  },
  LANDING: {
    html: {
      input: path.join(__dirname, './default_html_templates/source_landing.html'),
      output: path.join(__dirname, './dist/landing.html'),
    },
    css: {
      files: [
        path.join(__dirname, '../kings_day/css/shared/reset.css'),
        path.join(__dirname, '../kings_day/css/shared/variables.css'),
        path.join(__dirname, '../kings_day/css/shared/fonts.css'),
        path.join(__dirname, '../kings_day/css/shared/typography.css'),
        path.join(__dirname, '../kings_day/css/shared/buttons.css'),
        path.join(__dirname, '../kings_day/css/shared/wave.css'),
        path.join(__dirname, '../kings_day/css/landing/landing.css'),
      ],
      output: path.join(__dirname, './dist/css/landing/bundle.css')
    },
    js: {
      files: [
        path.join(__dirname, '../kings_day/js/landing/wavesManager.js'),
        path.join(__dirname, '../kings_day/js/landing/index.js'),
      ],
      output: path.join(__dirname, './dist/js/landing/bundle.js')
    } 
  },
  PAYMENT: {
    html: {
      input: path.join(__dirname, './default_html_templates/source_index.html'),
      output: path.join(__dirname, './dist/index.html'),
    },
    css: {
      files: [
        path.join(__dirname, '../kings_day/css/shared/reset.css'),
        path.join(__dirname, '../kings_day/css/shared/variables.css'),
        path.join(__dirname, '../kings_day/css/shared/fonts.css'),
        path.join(__dirname, '../kings_day/css/shared/typography.css'),
        path.join(__dirname, '../kings_day/css/shared/buttons.css'),
        path.join(__dirname, '../kings_day/css/shared/wave.css'),
        path.join(__dirname, '../kings_day/css/payment/loader.css'),
        path.join(__dirname, '../kings_day/css/payment/payment.css'),
      ],
      output: path.join(__dirname, './dist/css/payment/bundle.css')
    },
    js: {
      files: [
        path.join(__dirname, '../kings_day/js/payment/config.js'),
        path.join(__dirname, '../kings_day/js/payment/stateManager.js'),
        path.join(__dirname, '../kings_day/js/payment/loader.js'),
        path.join(__dirname, '../kings_day/js/payment/networking.js'),
        path.join(__dirname, '../kings_day/js/payment/index.js'),
      ],
      output: path.join(__dirname, './dist/js/payment/bundle.js')
    } 
  },
};

module.exports = BUNDLE_SCHEMA;
