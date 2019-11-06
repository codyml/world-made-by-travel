//  Action type constants
export const BOOK_CONTENT_RECEIVED = 'BOOK_CONTENT_RECEIVED';
export const SECTION_CONTENT_REQUESTED = 'SECTION_CONTENT_REQUESTED';
export const SECTION_CONTENT_RECEIVED = 'SECTION_CONTENT_RECEIVED';
export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION';
export const SET_SECTION_SCROLLED_TO = 'SET_SECTION_SCROLLED_TO';
export const SET_EXPLORER_OPEN = 'SET_EXPLORER_OPEN';
export const SET_EXPLORER_PATH = 'SET_EXPLORER_PATH';
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

//  Timeout for resetting the Copied message
export const COPIED_TIMEOUT = 5000;

//  Section content entity types
export const REFERABLE_CONTENT_TYPES = {
  section: 'section',
  paragraph: 'paragraph',
  figure: 'figure',
  footnoteLink: 'footnoteLink',
  footnote: 'footnote',
  block: 'block',
};

//  Regex to match a machine-readable string identifier for a content,
//  with the number in the first capturing group.
export const MATCH_CONTENT_IDENTIFIER = {
  [REFERABLE_CONTENT_TYPES.paragraph]: /^paragraph-(\d+)$/,
  [REFERABLE_CONTENT_TYPES.figure]: /^figure-(\d+)$/,
  [REFERABLE_CONTENT_TYPES.footnoteLink]: /^footnote-link-(\d+)$/,
  [REFERABLE_CONTENT_TYPES.footnote]: /^footnote-(\d+)$/,
  [REFERABLE_CONTENT_TYPES.block]: /^block-(\d+)$/,
};

//  Returns a machine-readable string identifier for a content type
//  and number.
export const GET_CONTENT_IDENTIFIER = {
  [REFERABLE_CONTENT_TYPES.paragraph]: (n) => `paragraph-${n}`,
  [REFERABLE_CONTENT_TYPES.figure]: (n) => `figure-${n}`,
  [REFERABLE_CONTENT_TYPES.footnoteLink]: (n) => `footnote-link-${n}`,
  [REFERABLE_CONTENT_TYPES.footnote]: (n) => `footnote-${n}`,
  [REFERABLE_CONTENT_TYPES.block]: (n) => `block-${n}`,
};

//  Returns a human-readable description for a content type and number.
export const GET_CONTENT_DESCRIPTION = {
  [REFERABLE_CONTENT_TYPES.paragraph]: (n) => `paragraph ${n}`,
  [REFERABLE_CONTENT_TYPES.figure]: (n) => `figure ${n}`,
  [REFERABLE_CONTENT_TYPES.footnoteLink]: (n) => `footnote link ${n}`,
  [REFERABLE_CONTENT_TYPES.footnote]: (n) => `footnote ${n}`,
  [REFERABLE_CONTENT_TYPES.block]: (n) => `block ${n}`,
};
