import React from 'react';
import { createGlobalStyle } from 'styled-components';

/*
* Context for sharing current browser size bewteen components.
*/

export const BrowserSizeContext = React.createContext();


/*
* Transition constants.
*/

export const DURATION = { // ms
  fade: 350,
  loadingFadeDelay: 500,
  slide: 500,
};


/*
* Ordering and position constants.
*/

export const Z_INDEX = {
  section: 100,
  modal: 500,
  cover: 1000,
  loading: 1500,
};

export const PAGE_WIDTH = 612;
export const SIDEBAR_WIDTH = 300;
export const GUTTER_WIDTH = 12;

export const MAX_CONTENT_SIZE = { // px
  mobile: null,
  tablet: PAGE_WIDTH,
  desktop: SIDEBAR_WIDTH + GUTTER_WIDTH + PAGE_WIDTH,
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

const atSizeUnbound = (size, styles) => `
  @media (min-width: ${BREAKPOINT_MIN_WIDTH[size]}px) {
    ${styles}
  }
`;

export const atSize = Object.assign({}, ...['mobile', 'tablet', 'desktop'].map((size) => ({
  [size]: atSizeUnbound.bind(null, size),
})));

export const CONTAINER_PADDING = `
  padding: 0 ${MIN_SIDE_PADDING.mobile}px;

  ${atSize.tablet(`
    padding: 0 calc((100% - ${MAX_CONTENT_SIZE.tablet}px) / 2);
  `)}

  ${atSize.desktop(`
    padding: 0 calc((100% - ${MAX_CONTENT_SIZE.desktop}px) / 2);
  `)}
`;


/*
* Font & color constants.
*/

export const FONTS = {
  display: '"Crimson", serif',
  sans: '"Source Sans Pro", sans-serif',
  serif: '"Source Serif Pro", serif',
};

const COLORS = {
  rustedChocolate: {
    dark: '#33201a',
    darkMid: '#734c3f',
    mid: '#5e2c1b',
    light: '#d7cac6',
  },
  unburntCaramel: {
    dark: '#806533',
    mid: '#bf9e60',
    midLight: '#ede5d5',
    light: '#f7f4ed',
  },
  nonexistentBlue: {
    dark: '#405980',
    mid: '#99a9bf',
    midLight: '#e5e9ef',
    light: '#f7f9fc',
  },
  absentLavender: {
    dark: '#675673',
    mid: '#aa7acc',
    light: '#e3cef2',
  },
};

export const THEME_COLORS = {
  coverTitle: COLORS.absentLavender.mid,
  coverSubtitle: COLORS.unburntCaramel.midLight,
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
