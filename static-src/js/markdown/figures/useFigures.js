import { useRef, useCallback } from 'react';

import style from 'styles/Figure.module.css';
import FigureContent from './FigureContent';
import FiguresMarkdownItPlugin, { FIGURE_TAG, CAPTION_TAG } from './FiguresMarkdownItPlugin';
import ReferencesMarkdownItPlugin, { REFERENCE_TAG } from './ReferencesMarkdownItPlugin';


/*
* Custom hook that lets React component handle references.
*/

export default function useFigures(figureContentByIdentifier) {
  const figureNumberRef = useRef();
  const captionNumberRefRef = useRef();
  return useCallback(({ tag, props, refNumber }) => {
    switch (tag) {
      case FIGURE_TAG: {
        figureNumberRef.current = refNumber;
        captionNumberRefRef.current = {};
        return {
          props: { ...props, className: style.Figure },
        };
      }

      case REFERENCE_TAG: {
        const referencedContent = figureContentByIdentifier[props.reference];
        return {
          tag: FigureContent,
          props: {
            valid: !!referencedContent,
            figureNumber: figureNumberRef.current,
            figureContentIdentifier: props.reference,
            captionNumberRef: captionNumberRefRef.current,
          },
          children: referencedContent ? referencedContent.contentNodes : [],
        };
      }

      case CAPTION_TAG: {
        captionNumberRefRef.current.current = refNumber;
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
