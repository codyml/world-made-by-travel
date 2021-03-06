import { combineReducers } from 'redux';

import {
  BOOK_CONTENT_RECEIVED,
  SECTION_CONTENT_REQUESTED,
  SECTION_CONTENT_RECEIVED,
  SET_CURRENT_SECTION,
  SET_EXPLORER_OPEN,
  SET_EXPLORER_PATH,
  SET_MODAL_OPEN,
  SET_MODAL_CONTENT,
  REQUESTED,
  EXPANDED_TOC,
  POSITIONS,
  PREPARE_TRANSITION,
  ENABLE_TRANSITION_CSS,
  START_TRANSITION,
  FINISH_TRANSITION,
  SET_BROWSER_SIZE,
  SET_MOBILE_MENU_OPEN,
} from './constants';

const config = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      return action.config;

    default:
      return state;
  }
};

const authorsBySlug = (state = null, action) => {
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
      //  Returns an array of the Table of Contents's top-level slugs
      return action.tableOfContents.map((item) => item.slug);

    default:
      return state;
  }
};

const sectionMetaBySlug = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      //  Walks TOC and returns object of top-level sections and
      //  sections inside groups keyed by slug.
      return action.tableOfContents.reduce((accum, next) => {
        const nextAccum = {};
        if (next.sections) {
          Object.assign(
            nextAccum,
            accum,
            ...next.sections.map((section, index) => ({
              [section.slug]: {
                ...section,
                group: next.slug,
                path: `/${next.slug}/${section.slug}`,
                index: Object.keys(accum).length + index,
              },
            })),
          );
        } else {
          Object.assign(
            nextAccum,
            accum,
            {
              [next.slug]: {
                ...next,
                path: `/${next.slug}`,
                index: Object.keys(accum).length,
              },
            },
          );
        }

        return nextAccum;
      }, {});

    default:
      return state;
  }
};

const sectionGroupMetaBySlug = (state = null, action) => {
  switch (action.type) {
    case BOOK_CONTENT_RECEIVED:
      //  Walks TOC and returns object of section groups keyed by
      //  slug.
      return Object.assign({}, ...action.tableOfContents
        .filter((item) => item.sections)
        .map((sectionGroup) => ({
          [sectionGroup.slug]: {
            ...sectionGroup,
            sections: sectionGroup.sections.map((item) => item.slug),
            path: `/${sectionGroup.slug}`,
            redirectPath: `/${sectionGroup.slug}/${sectionGroup.sections[0].slug}`,
          },
        })));

    default:
      return state;
  }
};

const sectionContentBySlug = (state = {}, action) => {
  switch (action.type) {
    case SECTION_CONTENT_REQUESTED:
      return {
        ...state,
        [action.sectionSlug]: REQUESTED,
      };

    case SECTION_CONTENT_RECEIVED: {
      return {
        ...state,
        [action.sectionSlug]: action.sectionContent,
      };
    }

    default:
      return state;
  }
};

const currentSectionSlug = (state = EXPANDED_TOC.slug, action) => {
  switch (action.type) {
    case SET_CURRENT_SECTION:
      return action.sectionSlug;

    default:
      return state;
  }
};

const explorerOpen = (state = false, action) => {
  switch (action.type) {
    case SET_EXPLORER_OPEN:
      return action.explorerOpen;

    case SET_EXPLORER_PATH:
      return true;

    default:
      return state;
  }
};

const explorerPath = (state = '/', action) => {
  switch (action.type) {
    case SET_EXPLORER_PATH:
      return action.explorerPath;

    default:
      return state;
  }
};

const modalOpen = (state = false, action) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return action.modalOpen;

    case SET_MODAL_CONTENT:
      return true;

    default:
      return state;
  }
};

const modalContent = (state = {}, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      return action.modalContent;
    }

    default:
      return state;
  }
};

const slugsByTransitionPosition = (state = { [POSITIONS.center]: EXPANDED_TOC.slug }, action) => {
  switch (action.type) {
    case PREPARE_TRANSITION:
      return {
        ...state,
        [action.nextSlugStartPosition]: action.nextSlug,
      };

    case FINISH_TRANSITION:
      return {
        [POSITIONS.center]: action.nextSlug,
      };

    default:
      return state;
  }
};

const currentTransitionPosition = (state = POSITIONS.center, action) => {
  switch (action.type) {
    case START_TRANSITION:
      return action.nextSlugStartPosition;

    case FINISH_TRANSITION:
      return POSITIONS.center;

    default:
      return state;
  }
};

const transitionPrepared = (state = false, action) => {
  switch (action.type) {
    case PREPARE_TRANSITION:
      return true;

    case FINISH_TRANSITION:
      return false;

    default:
      return state;
  }
};

const transitionCssEnabled = (state = false, action) => {
  switch (action.type) {
    case ENABLE_TRANSITION_CSS:
      return true;

    case FINISH_TRANSITION:
      return false;

    default:
      return state;
  }
};

const transitionStarted = (state = false, action) => {
  switch (action.type) {
    case START_TRANSITION:
      return true;

    case FINISH_TRANSITION:
      return false;

    default:
      return state;
  }
};

const browserSize = (state = 'mobile', action) => {
  switch (action.type) {
    case SET_BROWSER_SIZE:
      return action.browserSize;

    default:
      return state;
  }
};

const mobileMenuOpen = (state = false, action) => {
  switch (action.type) {
    case SET_MOBILE_MENU_OPEN:
      return action.mobileMenuOpen;

    case SET_BROWSER_SIZE:
      return false;

    default:
      return state;
  }
};


export default combineReducers({
  config,
  authorsBySlug,
  tableOfContents,
  sectionMetaBySlug,
  sectionGroupMetaBySlug,
  sectionContentBySlug,
  currentSectionSlug,
  explorerOpen,
  explorerPath,
  modalOpen,
  modalContent,
  slugsByTransitionPosition,
  currentTransitionPosition,
  transitionPrepared,
  transitionCssEnabled,
  transitionStarted,
  browserSize,
  mobileMenuOpen,
});
