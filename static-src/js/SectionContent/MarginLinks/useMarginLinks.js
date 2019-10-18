import { useCallback } from 'react';

import MarginLinks, { PARAGRAPH, FIGURE, FOOTNOTE } from './MarginLinks';
import { FIGURE_TAG, FOOTNOTE_TAG } from '../../markdown';


const PARAGRAPH_TAG = 'p';

export default function useMarginLinks() {
  return useCallback((node, ancestors) => {
    console.log(node, ancestors);
    if (ancestors.length === 1) {
      switch (node.tag) {
        case PARAGRAPH_TAG: {
          return {
            tag: MarginLinks,
            props: { recipientType: PARAGRAPH, insideBlock: true },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        case FIGURE_TAG: {
          return {
            tag: MarginLinks,
            props: { recipientType: FIGURE, insideBlock: true },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        case FOOTNOTE_TAG: {
          return {
            tag: MarginLinks,
            props: { recipientType: FOOTNOTE, insideBlock: true },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        default:
      }
    }

    return {};
  }, []);
}
