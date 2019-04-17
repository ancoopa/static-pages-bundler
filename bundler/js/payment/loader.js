class Loader {
  startPending() {
    buttonProceedElement.disabled = true;
    contentElement.className = `${contentElement.className} ${CSS_CONTENT_PENDING}`;
    loaderWrapperElement.className = loaderWrapperElement.className.replace(CSS_LOADER_HIDE, '');
  } 
  
  endPending() {
    buttonProceedElement.disabled = false;
    contentElement.className = contentElement.className.replace(CSS_CONTENT_PENDING, '');
    loaderWrapperElement.className = `${loaderWrapperElement.className} ${CSS_LOADER_HIDE}`;
  }  
};
