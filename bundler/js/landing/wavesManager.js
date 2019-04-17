class LandingManager {
  constructor() {
    this.currentBreakpoint = '';
    this.topWavePathElement = document.querySelector('path#wave1');
    this.topWaveSvgElement = document.querySelector('div.svg-wrapper-section-1 svg');
    this.bottomWavePathElement = document.querySelector('path#wave2');
    this.resizeWaves();
    window.addEventListener('resize', debounce(this.resizeWaves.bind(this), 100));
  }

  resizeWaves() {
    const nextBreakpoint = this.getCurrentBreakpoint();
    if (nextBreakpoint !== this.currentBreakpoint) {
      this.topWavePathElement.setAttribute('d', WAVE_CONFIG[nextBreakpoint].top.path);
      this.bottomWavePathElement.setAttribute('d', WAVE_CONFIG[nextBreakpoint].bottom.path);
      this.topWaveSvgElement.setAttribute('viewBox', WAVE_CONFIG[nextBreakpoint].top.viewBox);
      this.currentBreakpoint = nextBreakpoint;
    }
    return null;
  }

  getCurrentBreakpoint() {
    const screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (screenWidth > SMARTPHONE_BREAKPOINT_IN_PX) {
      return BREAKPOINT_NAME.DESKTOP;
    }
    return BREAKPOINT_NAME.SMARTPHONE;
  }
}
