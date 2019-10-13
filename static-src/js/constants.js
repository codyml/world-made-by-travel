//  Action type constants
export const BOOK_CONTENT_RECEIVED = 'BOOK_CONTENT_RECEIVED';
export const SECTION_CONTENT_REQUESTED = 'SECTION_CONTENT_REQUESTED';
export const SECTION_CONTENT_RECEIVED = 'SECTION_CONTENT_RECEIVED';
export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION';
export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';
export const SET_EXPLORER_OPEN = 'SET_EXPLORER_OPEN';
export const SET_EXPLORER_URL = 'SET_EXPLORER_URL';
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const PREPARE_TRANSITION = 'PREPARE_TRANSITION';
export const ENABLE_TRANSITION_CSS = 'ENABLE_TRANSITION_CSS';
export const START_TRANSITION = 'START_TRANSITION';
export const FINISH_TRANSITION = 'FINISH_TRANSITION';
export const SET_MOBILE_MENU_OPEN = 'SET_MOBILE_MENU_OPEN';
export const SET_BROWSER_SIZE = 'SET_BROWSER_SIZE';


//  Constant indicating that section content has been requested.
export const REQUESTED = 'REQUESTED';

//  Enum for the various types of modals.
export const AUTHOR_MODAL = 'AUTHOR_MODAL';
export const FIGURE_MODAL = 'FIGURE_MODAL';
export const CITATION_MODAL = 'CITATION_MODAL';

//  Table of Contents meta
export const EXPANDED_TOC = {
  slug: 'toc',
  path: '/toc',
  title: 'Table of Contents',
  index: -1,
};

//  Cover meta
export const COVER = {
  slug: 'cover',
  path: '/',
};

//  Position constants
export const POSITIONS = {
  left: 'left',
  center: 'center',
  right: 'right',
};

//  Recognized URL hash types and regexes
const PARAGRAPH = 'PARAGRAPH';
const FIGURE = 'FIGURE';
const FOOTNOTE = 'FOOTNOTE';
const BLOCK = 'BLOCK';
const hashTypes = {
  [PARAGRAPH]: /^paragraph-(\d+)$/,
  [FIGURE]: /^figure-(\d+)$/,
  [FOOTNOTE]: /^footnote-(\d+)$/,
  [BLOCK]: /^block-(\d+)$/,
};

//  Returns the type of hash reference and referenced number/index.
export const getHashReference = (hash) => {
  for (const [type, regex] of Object.entries(hashTypes)) {
    const match = hash.match(regex);
    if (match) {
      const [, number] = match;
      return [type, +number];
    }
  }

  return [];
};

//  Recognized Explorer link types
const ROOT = 'ROOT';
const PAGE = 'PAGE';
const LIST = 'LIST';
const ENTRY = 'ENTRY';
const explorerLinkTypes = {
  [ROOT]: /^\/?$/,
  [PAGE]: /^\/?(about|search|explore|lists(?=\/$)|visualizations)/,
  [LIST]: /^\/lists\/(\w+)/,
  [ENTRY]: /^\/entries\/(\d+)/,
};

//  Returns the type of Explorer link with some description text.
export const getExplorerLinkType = (path) => {
  for (const [type, regex] of Object.entries(explorerLinkTypes)) {
    const match = path.match(regex);
    switch (match && type) {
      case ROOT: {
        return { root: true };
      }

      case PAGE: {
        const [, page] = match;
        return { page };
      }

      case LIST: {
        return { list: true };
      }

      case ENTRY: {
        const [, entryIndex] = match;
        return { entry: true, entryIndex };
      }

      default:
    }
  }

  return null;
};
