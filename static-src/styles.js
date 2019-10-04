import React from 'react';
import { createGlobalStyle } from 'styled-components';

/*
* Context for sharing current browser size bewteen components.
*/

export const BrowserSizeContext = React.createContext();


/*
* Misc constants.
*/

export const DURATION = { // ms
  fade: 250,
  loadingFadeDelay: 500,
  slide: 500,
};

export const Z_INDEX = {
  section: 100,
  modal: 500,
  cover: 1000,
  loading: 1500,
};

export const MAX_CONTENT_SIZE = { // px
  mobile: null,
  tablet: 612,
  desktop: 924,
};

export const MIN_SIDE_PADDING = { // px
  mobile: 18,
  tablet: 36,
  desktop: 24,
};

export const BREAKPOINT_MIN_WIDTH = { // px
  mobile: 0,
  tablet: MAX_CONTENT_SIZE.tablet + 2 * MIN_SIDE_PADDING.tablet,
  desktop: MAX_CONTENT_SIZE.desktop + 2 * MIN_SIDE_PADDING.desktop,
};

export const CONTAINER_PADDING = `
  padding: 0 ${MIN_SIDE_PADDING.mobile}px;

  @media (min-width: ${BREAKPOINT_MIN_WIDTH.tablet}px) {
    padding: 0 calc((100% - ${MAX_CONTENT_SIZE.tablet}px) / 2);
  }

  @media (min-width: ${BREAKPOINT_MIN_WIDTH.desktop}px) {
    padding: 0 calc((100% - ${MAX_CONTENT_SIZE.desktop}px) / 2);
  }
`;

export const column = (n) => `${100 * (n / 12)}%`;

export const FONTS = {
  display: '"Crimson", serif',
  sans: '"Source Sans Pro", sans-serif',
  serif: '"Source Serif Pro", serif',
};


/*
* Global styles for the app.
*/

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-size: 16px;
    font-family: ${FONTS.sans};
    font-weight: lighter;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
