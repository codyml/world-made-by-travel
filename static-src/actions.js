import {
  AUTHOR_MODAL,
  FIGURE_MODAL,
  CITATION_MODAL,
} from './constants';

//  Action type constants
export const BOOK_CONTENT_RECEIVED = 'BOOK_CONTENT_RECEIVED';
export const SECTION_OPENED = 'SECTION_OPENED';
export const SECTION_SCROLLED = 'SECTION_SCROLLED';
export const SET_EXPLORER_OPEN = 'SET_EXPLORER_OPEN';
export const SET_EXPLORER_URL = 'SET_EXPLORER_URL';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';

//  Action creators
export const bookContentReceived = (config, authors, tableOfContents) => ({
  type: BOOK_CONTENT_RECEIVED,
  config,
  authors,
  tableOfContents,
});

export const sectionOpened = (sectionSlug) => ({
  type: SECTION_OPENED,
  sectionSlug,
});

export const sectionScrolled = (scrollPosition) => ({
  type: SECTION_SCROLLED,
  scrollPosition,
});

export const openExplorer = () => ({
  type: SET_EXPLORER_OPEN,
  explorerOpen: true,
});

export const closeExplorer = () => ({
  type: SET_EXPLORER_OPEN,
  explorerOpen: false,
});

export const setExplorerUrl = (explorerUrl) => ({
  type: SET_EXPLORER_URL,
  explorerUrl,
});

export const openAuthorModal = (authorSlug) => ({
  type: SET_MODAL_CONTENT,
  modalType: AUTHOR_MODAL,
  authorSlug,
});

export const openFigureModal = (sectionSlug, figureIdentifier) => ({
  type: SET_MODAL_CONTENT,
  modalType: FIGURE_MODAL,
  sectionSlug,
  figureIdentifier,
});

export const openCitationModal = (sectionSlug, paragraphIdentifier, figureIdentifier) => ({
  type: SET_MODAL_CONTENT,
  modalType: CITATION_MODAL,
  sectionSlug,
  paragraphIdentifier,
  figureIdentifier,
});

export const closeModal = () => ({
  type: SET_MODAL_CONTENT,
});
