class StateManager {
  constructor(initialState = STATE_NAME.PAYMENT) {
    this.currentState = 'PAYMENT';
    this.setState(initialState);
  }
  

  isStateNameValid(stateName) {
    return Object.keys(STATE_NAME).includes(stateName);
  }

  setState(nextStateName = STATE_NAME.PAYMENT) {
    if (this.isStateNameValid(nextStateName) && this.currentState !== nextStateName) {
      this.updatePage(nextStateName);
      this.currentState = STATE_NAME[nextStateName];
    }
  }

  updatePage(nextStateName) {
    const elementsOnThePageList = Object.keys(STATE_DATA[this.currentState]);
    const nextElementsOnThePageList = Object.keys(STATE_DATA[nextStateName]);
    const makeVisible = el => el.style.display = 'block';
    const makeInvisible = el => el.style.display = 'none';

    nextElementsOnThePageList.forEach((elementName) => {
      const webElement = STATE_MANAGER_ELEMENTS[elementName];
      const nextText = STATE_DATA[nextStateName][elementName].text;
      const isElementAlreadyVisibleOnThePage = elementsOnThePageList.includes(elementName);
      const doesElementNeedTextChange = nextText && webElement.innerText !== nextText;
      const removeCurrentItemFromList = () => elementsOnThePageList.splice(elementsOnThePageList.indexOf(elementName), 1);
      if (doesElementNeedTextChange) {
        webElement.innerText = nextText;
      }
      if (!isElementAlreadyVisibleOnThePage) {
        makeVisible(webElement);
      }
      removeCurrentItemFromList();
    });

    if (elementsOnThePageList.length > 0) {
      elementsOnThePageList.forEach((elementName) => {
        const webElement = STATE_MANAGER_ELEMENTS[elementName];
        makeInvisible(webElement);
      });
    }
  }
};
