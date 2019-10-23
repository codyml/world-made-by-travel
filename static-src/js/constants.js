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

//  Section content entity types
export const REFERABLE_CONTENT_TYPES = {
  section: 'section',
  paragraph: 'paragraph',
  figure: 'figure',
  footnoteLink: 'footnoteLink',
  footnote: 'footnote',
  block: 'block',
};

//  Hash generators/matchers for referable content types
export const CONTENT_TYPE_HASH = {
  [REFERABLE_CONTENT_TYPES.paragraph]: {
    regex: /^paragraph-(\d+)$/,
    getDescription: (n) => `Paragraph ${n}`,
    generate: (n) => `paragraph-${n}`,
  },

  [REFERABLE_CONTENT_TYPES.figure]: {
    regex: /^figure-(\d+)$/,
    getDescription: (n) => `Figure ${n}`,
    generate: (n) => `figure-${n}`,
  },

  [REFERABLE_CONTENT_TYPES.footnoteLink]: {
    regex: /^footnote-link-(\d+)$/,
    getDescription: (n) => `Footnote Link ${n}`,
    generate: (n) => `footnote-link-${n}`,
  },

  [REFERABLE_CONTENT_TYPES.footnote]: {
    regex: /^footnote-(\d+)$/,
    getDescription: (n) => `Footnote ${n}`,
    generate: (n) => `footnote-${n}`,
  },

  [REFERABLE_CONTENT_TYPES.block]: {
    regex: /^block-(\d+)$/,
    getDescription: (n) => `Block ${n}`,
    generate: (n) => `block-${n}`,
  },
};
