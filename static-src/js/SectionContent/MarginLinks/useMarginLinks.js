import { useCallback } from 'react';

import MarginLinks from './MarginLinks';
import { FIGURE_TAG, FOOTNOTE_TAG } from '../../markdown';
import { REFERABLE_CONTENT_TYPES } from '../../constants';


const PARAGRAPH_TAG = 'p';

export default function useMarginLinks() {
  return useCallback((node, ancestors) => {
    if (ancestors.length === 1) {
      switch (node.tag) {
        case PARAGRAPH_TAG: {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.paragraph,
              contentNumber: node.refNumber,
              insideBlock: true,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        case FIGURE_TAG: {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.figure,
              contentNumber: node.refNumber,
              insideBlock: true,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        case FOOTNOTE_TAG: {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.footnote,
              contentNumber: node.refNumber,
              insideBlock: true,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        default:
      }
    }

    return {};
  }, []);
}
