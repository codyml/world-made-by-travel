import { combineReducers } from 'redux';

import {
  BOOK_CONTENT_RECEIVED,
  SECTION_OPENED,
  SECTION_SCROLLED,
  SET_EXPLORER_OPEN,
  SET_EXPLORER_URL,
  SET_MODAL_CONTENT,
} from './actions';

const config = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      return action.config;

    default:
      return state;
  }
};

const authors = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      //  Creates map of author slug to author
      return Object.assign({}, ...action.authors.map((author) => ({ [author.slug]: author })));

    default:
      return state;
  }
};

const tableOfContents = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      return action.tableOfContents;

    default:
      return state;
  }
};

const currentSectionSlug = (state = null, action) => {
  switch (action.type) {
    case SECTION_OPENED:
      return action.sectionSlug;

    default:
      return state;
  }
};

const currentSectionScrollPosition = (state = 0, action) => {
  switch (action.type) {
    case SECTION_OPENED:
      return 0;

    case SECTION_SCROLLED:
      return action.scrollPosition;

    default:
      return state;
  }
};

const explorerOpen = (state = false, action) => {
  switch (action.type) {
    case SET_EXPLORER_OPEN:
      return action.explorerOpen;

    case SET_EXPLORER_URL:
      return true;

    default:
      return state;
  }
};

const explorerUrl = (state = '/', action) => {
  switch (action.type) {
    case SET_EXPLORER_URL:
      return action.explorerUrl;

    default:
      return state;
  }
};

const modalContent = (state = null, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT:
      if (action.modalType) {
        return {
          modalType: action.modalType,
          authorSlug: action.authorSlug,
          sectionSlug: action.sectionSlug,
          paragraphIdentifier: action.paragraphIdentifier,
          figureIdentifier: action.figureIdentifier,
        };
      }

      return null;

    default:
      return state;
  }
};

export default combineReducers({
  config,
  authors,
  tableOfContents,
  currentSectionSlug,
  currentSectionScrollPosition,
  explorerOpen,
  explorerUrl,
  modalContent,
});
