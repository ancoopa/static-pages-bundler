// Constants
const ENDPOINT_DOMAIN = 'https://vf6kq216m0.execute-api.eu-west-1.amazonaws.com';
const ENDPOINT_URL = `${ENDPOINT_DOMAIN}/prod/kleedje`;
const CSS_LOADER_HIDE = 'loader-hide';
const CSS_CONTENT_PENDING = 'content-pending';
const URL_LANDING = '/landing.html';
///

// Web elements
const buttonProceedElement = document.getElementById('button-proceed');
const titleElement = document.getElementById('title');
const textElement = document.getElementById('text');
const sellerNameElement = document.getElementById('seller-name');
const contentElement = document.getElementById('content');
const loaderWrapperElement = document.getElementById('loader-wrapper');
///

// State manager
const STATE_DATA = {
  PAYMENT: {
    title: { text: 'Welkom bij het kleedje van ' },
    text: { text: 'Hier kan je gemakkelijk online betalen via je eigen bank op Koningsdag.' },
    button: {},
  },
  ERROR: {
    title: { text: 'Er ging iets mis! Probeer de QR-code opnieuw te scannen.' },
  }
};
const STATE_MANAGER_ELEMENTS = {
  button: buttonProceedElement,
  title: titleElement,
  text: textElement
};
const STATE_NAME = {
  PAYMENT: 'PAYMENT',
  ERROR: 'ERROR',
};
///
