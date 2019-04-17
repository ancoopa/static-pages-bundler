document.addEventListener('DOMContentLoaded', () => new LandingManager(), false);
function scrollDown() {
  return document.location =
    `${document.location.origin}${document.location.pathname}#read-more`;
}
function scrollUp() {
  return document.documentElement.scrollTop = 0;
}


const SMARTPHONE_BREAKPOINT_IN_PX = 641;
const BREAKPOINT_NAME = {
  DESKTOP: 'DESKTOP',
  SMARTPHONE: 'SMARTPHONE'
}
const WAVE_CONFIG = {
  [BREAKPOINT_NAME.SMARTPHONE]: {
    top: {
      path: 'M 0,0 C 30,0 30,12 60,12 90,12 90,0 120,0 150,0 150,12 180,12 210,12 210,0 240,0 v 110 h -240 z',
      viewBox: '0 0 120 110'
    },
    bottom: {
      path: 'M 0,12 C 30,12 30,0 60,0 90,0 90,12 120,12 150,12 150,0 180,0 210,0 210,12 240,12 v 26 h -240 z',
    }
  },
  [BREAKPOINT_NAME.DESKTOP]: {
    top: {
      path: 'M 0,0 C 30,0 30,2 60,2 90,2 90,0 120,0 150,0 150,2 180,2 210,2 210,0 240,0 v 80 h -240 z',
      viewBox: '0 0 120 80'
    },
    bottom: { 
      path: 'M 0,2 C 30,2 30,0 60,0 90,0 90,2 120,2 150,2 150,0 180,0 210,0 210,2 240,2 v 26 h -240 z',
    }
  }
};

// TODO: move me to Utils
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
