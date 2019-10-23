import { useCallback, useRef } from 'react';

import MarginLinks from './MarginLinks';
import { Footnote, Figure, FigureContent, PARAGRAPH_TAG } from '../../markdown';
import { REFERABLE_CONTENT_TYPES } from '../../constants';


export default function useMarginLinks() {
  const figureNumber = useRef();

  return useCallback((node, ancestors) => {
    switch (node.component) {
      case PARAGRAPH_TAG: {
        if (ancestors.length === 1) {
          return {
            component: MarginLinks,
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
        if (ancestors[0].component === Figure) {
          return {
            component: MarginLinks,
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
            component: MarginLinks,
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
