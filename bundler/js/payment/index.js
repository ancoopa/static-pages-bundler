document.addEventListener('DOMContentLoaded', start, false);

const loader = new Loader();
const stateManager = new StateManager(STATE_NAME.PENDING);
const networkManager = new NetworkManager();

function start() {
  const requestUrl = processUrlParams();
  return networkManager.fetchPopulateSellerData(requestUrl);
}

function processUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const sellerCode = urlParams.get('code_id');
  if (sellerCode) {
    return `${ENDPOINT_URL}/${sellerCode}`;
  }
  return window.location.replace(URL_LANDING);
}
