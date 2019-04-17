// TODO: refactor me
class NetworkManager {
  fetchPopulateSellerData(requestUrl) {
    loader.startPending();
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
    }
    return fetch(requestUrl, {
      method: 'GET',
      headers
    }).then(jsonResponse => jsonResponse.json())
      .then(response => this.handleSuccess(response))
      .catch(error => this.handleError(error));
  }
  
  handleError(error) {
    stateManager.setState(STATE_NAME.ERROR);
    return loader.endPending();
  }
  
  handleSuccess(response) {
    this.populatePageContent(response);
    return loader.endPending();
  }

  populatePageContent(response) {
    stateManager.setState(STATE_NAME.PAYMENT);
    const { payment_link, seller_name } = response.object;
    sellerNameElement.innerText = `${seller_name}!`;
    return buttonProceedElement.addEventListener('click', () => {
      document.location.href = `${payment_link}`;
    });
  }
};
