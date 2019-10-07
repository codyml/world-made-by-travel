import styled, { createGlobalStyle } from 'styled-components';
import normalizeCss from 'normalize.css';

/*
* Transition constants.
*/

export const DURATION = { // ms
  fade: 350,
  loadingFadeDelay: 0,
  slide: 350,
  pageTransition: 600,
};


/*
* Ordering and position constants.
*/

export const Z_INDEX = {
  mobileMenu: 50,
  readerView: 100,
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
  desktop: 72,
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
  padding-left: ${MIN_SIDE_PADDING.mobile}px;
  padding-right: ${MIN_SIDE_PADDING.mobile}px;

  ${atSize.tablet(`
    padding-left: calc((100% - ${MAX_CONTENT_SIZE.tablet}px) / 2);
    padding-right: calc((100% - ${MAX_CONTENT_SIZE.tablet}px) / 2);
  `)}

  ${atSize.desktop(`
    padding-left: calc((100% - ${MAX_CONTENT_SIZE.desktop}px) / 2);
    padding-right: calc((100% - ${MAX_CONTENT_SIZE.desktop}px) / 2);
  `)}
`;

export const PAGE_GUTTER = 36;

export const StyledFadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition-property: opacity, visibility;
  transition-duration: ${DURATION.fade}ms, 0s;
  transition-delay: ${({ visible }) => (visible ? '0s, 0s' : `0s, ${DURATION.fade}ms`)};
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
    mid: '#5e2c1b',
    midLight: '#734c3f',
    light: '#d7cac6',
  },
  unburntCaramel: {
    dark: '#594216',
    darkMid: '#806533',
    mid: '#bf9e60',
    midMidLight: '#e9be8f',
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
  coverAuthor: COLORS.unburntCaramel.midMidLight,
  coverPublicationInformationBackground: COLORS.unburntCaramel.dark,
  readerViewTitle: COLORS.rustedChocolate.mid,
  mobileMenuBackground: COLORS.rustedChocolate.mid,
  authorLink: COLORS.unburntCaramel.darkMid,
  uiHr: COLORS.rustedChocolate.light,
  tableOfContentsHeader: COLORS.rustedChocolate.mid,
  explorerButton: COLORS.nonexistentBlue.dark,
};


/*
* Reusable text style components.
*/

export const StyledBookTitle = styled.div`
  font-family: ${FONTS.display};
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: -0.01em;
  color: ${THEME_COLORS.readerViewTitle};
`;

export const StyledBookAuthor = styled.div`
  font-family: ${FONTS.serif};
  font-style: italic;
`;

export const StyledBookContent = styled.div`
  font-family: ${FONTS.serif};
  line-height: 1.45;
  letter-spacing: 0.01em;

  hr {
    border: 0;
    border-top: 1px solid #777;
    margin: 1.5em 0;
  }

  a {
    text-decoration: underline;
  }
`;


/*
* Other misc reusable components.
*/

export const Triangle = styled.div`
  width: 0.5em;
  height: 0.45em;
  position: relative;

  ::before {
    content: '▴';
    display: block;
    line-height: 0;
    font-size: 1.4em;
    position: absolute;
    top: 0.1em;
    left: -0.09em;
  }
`;

export const StyledPanel = styled.div`
  display: block;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);
`;

/*
* Global styles for the app.
*/

export const GlobalStyles = createGlobalStyle`
  @import url("${normalizeCss}");

  html {
    font-size: 12px; /* 1 rem */
  }

  body {
    font-family: ${FONTS.sans};
    font-weight: 300;
    color: #333;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: inherit;
    opacity: 1;
    transition: opacity 150ms;

    :hover {
      opacity: 0.9;
    }
  }

  strong {
    font-weight: bold;
  }
`;
