import { useRef, useCallback, useContext } from 'react';

import FigureContent from './FigureContent';
import Figure from './Figure';
import { FIGURE_TAG, CAPTION_TAG } from './FiguresMarkdownItPlugin';
import { FIGURE_CONTENT_TAG } from './FigureContentMarkdownItPlugin';
import CurrentSectionContext from '../../CurrentSectionContext';


/*
* Custom hook that lets React component handle references.
*/

export default function useFigures() {
  const figureNumberRef = useRef();
  const captionNumberRefRef = useRef();
  const currentSectionContext = useContext(CurrentSectionContext);

  return useCallback(({ tag, props, refNumber }) => {
    if (!currentSectionContext) {
      return {};
    }

    switch (tag) {
      case FIGURE_TAG: {
        figureNumberRef.current = refNumber;
        captionNumberRefRef.current = {};
        return {
          tag: Figure,
          props: { figureNumber: refNumber },
        };
      }

      case FIGURE_CONTENT_TAG: {
        const { figureContentByIdentifier } = currentSectionContext;
        const figureContent = figureContentByIdentifier[props.reference];
        return {
          tag: FigureContent,
          props: {
            figureNumber: figureNumberRef.current,
            figureContentIdentifier: props.reference,
            captionNumberRef: captionNumberRefRef.current,
            downloadAllowed: figureContent ? !!figureContent.download : false,
          },
          children: figureContent ? figureContent.contentNodes : null,
        };
      }

      case CAPTION_TAG: {
        captionNumberRefRef.current.current = refNumber;
        break;
      }

      default:
    }

    return {};
  }, [currentSectionContext]);
}
