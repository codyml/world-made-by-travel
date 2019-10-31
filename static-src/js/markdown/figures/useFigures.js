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

  return useCallback(({ component, props, refNumber }) => {
    if (!currentSectionContext) {
      return {};
    }

    switch (component) {
      case FIGURE_TAG: {
        figureNumberRef.current = refNumber;
        captionNumberRefRef.current = {};
        return {
          component: Figure,
        };
      }

      case FIGURE_CONTENT_TAG: {
        const { figureContentByIdentifier } = currentSectionContext;
        const figureContent = figureContentByIdentifier[props.reference];
        if (figureContent) {
          return {
            component: FigureContent,
            props: {
              figureNumber: figureNumberRef.current,
              figureContentIdentifier: props.reference,
              captionNumberRef: captionNumberRefRef.current,
              downloadAllowed: !!figureContent.download,
            },
            children: figureContent.contentNodes,
          };
        }

        return {
          component: 'span',
          children: [props.text],
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
