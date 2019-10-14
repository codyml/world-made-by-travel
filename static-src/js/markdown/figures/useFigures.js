import { useRef, useCallback } from 'react';

import FigureContent from './FigureContent';
import FiguresMarkdownItPlugin, { FIGURE_TAG, CAPTION_TAG } from './FiguresMarkdownItPlugin';
import ReferencesMarkdownItPlugin, { REFERENCE_TAG } from './ReferencesMarkdownItPlugin';


/*
* Custom hook that lets React component handle references.
*/

export default function useFigures(figureContentByIdentifier) {
  const figureNumberRef = useRef();
  const captionContentRefRef = useRef();
  return useCallback(({ tag, props, refNumber, children }) => {
    switch (tag) {
      case FIGURE_TAG: {
        figureNumberRef.current = refNumber;
        captionContentRefRef.current = {};
        break;
      }

      case REFERENCE_TAG: {
        const referencedContent = figureContentByIdentifier[props.reference];
        return {
          tag: FigureContent,
          props: {
            valid: !!referencedContent,
            figureNumber: figureNumberRef.current,
            captionContentRef: captionContentRefRef.current,
          },
          children: referencedContent ? referencedContent.contentNodes : [],
        };
      }

      case CAPTION_TAG: {
        captionContentRefRef.current.current = children;
        break;
      }

      default:
    }

    return {};
  }, [figureContentByIdentifier]);
}

export {
  FiguresMarkdownItPlugin,
  ReferencesMarkdownItPlugin,
};
