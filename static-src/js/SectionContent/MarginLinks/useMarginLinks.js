import { useCallback, useRef } from 'react';

import MarginLinks from './MarginLinks';
import { Footnote, Figure, FigureContent } from '../../markdown';
import { REFERABLE_CONTENT_TYPES } from '../../constants';


const PARAGRAPH_TAG = 'p';

export default function useMarginLinks() {
  const figureNumber = useRef();

  return useCallback((node, ancestors) => {
    switch (node.tag) {
      case PARAGRAPH_TAG: {
        if (ancestors.length === 1) {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.paragraph,
              contentNumber: node.refNumber,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        break;
      }

      case Figure: {
        figureNumber.current = node.refNumber;
        break;
      }

      case FigureContent: {
        if (ancestors[0].tag === Figure) {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.figure,
              contentNumber: figureNumber.current,
              downloadAllowed: node.props.downloadAllowed,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        break;
      }

      case Footnote: {
        if (ancestors.length === 1) {
          return {
            tag: MarginLinks,
            props: {
              contentType: REFERABLE_CONTENT_TYPES.footnote,
              contentNumber: node.refNumber,
            },
            children: [{ ...node, key: 'marginLinksWrapped' }],
          };
        }

        break;
      }

      default:
    }

    return {};
  }, []);
}
