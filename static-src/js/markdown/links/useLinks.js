import { useCallback, useRef } from 'react';

import ExplorerLink from './ExplorerLink';
import BookLink from './BookLink';
import ExternalLink from './ExternalLink';

import {
  SPECIAL_LINK_TAG,
  EXPLORER_LINK_TYPE,
  BOOK_LINK_TYPE,
} from './SpecialLinksMarkdownItPlugin';


/*
* Custom hook allowing React components rendering contentNodes to
* handle Explorer links and book links, plus render popup tooltips
* for external links.  Returns a contentNodes extension.
*/

export default function useLinks() {
  const nextLinkType = useRef();

  return useCallback((item) => {
    const { component, props } = item;
    switch (component) {
      case SPECIAL_LINK_TAG: {
        nextLinkType.current = props.linkType;
        return false;
      }

      case 'a': {
        const linkType = nextLinkType.current;
        nextLinkType.current = null;
        switch (linkType) {
          case EXPLORER_LINK_TYPE: {
            return { component: ExplorerLink };
          }

          case BOOK_LINK_TYPE: {
            return { component: BookLink };
          }

          default: {
            return { component: ExternalLink };
          }
        }
      }

      default:
    }

    return {};
  }, []);
}
