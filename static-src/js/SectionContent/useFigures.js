import { useRef, useCallback } from 'react';
import { REFERENCE_TAG, FIGURE_TAG } from '../markdown';


/*
* Custom hook that lets React component handle references.
*/

export default function useFigures(figureContentByIdentifier) {
  const currentFigure = useRef();
  return useCallback(({ tag, props, children }) => {
    switch (tag) {
      case FIGURE_TAG: {
        currentFigure.current = { tag, props, children };
        return {};
      }

      case REFERENCE_TAG: {
        const referencedContent = figureContentByIdentifier[props.reference];
        return {
          tag: 'div',
          props: {
            // valid: !!content,
            // figure: currentFigure.current,
          },
          children: referencedContent ? referencedContent.contentItems : [],
        };
      }

      default: {
        return {};
      }
    }
  }, [figureContentByIdentifier]);
}
