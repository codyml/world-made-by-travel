import React, { useMemo } from 'react';

import AuthorModalForeground from './AuthorModal';
import { FigureModalBackground, FigureModalForeground } from './FigureModal';
import CitationModalForeground from './CitationModal';
import { AUTHOR_MODAL, FIGURE_MODAL, CITATION_MODAL } from '../../constants';

/*
* Custom hook that returns the appropriate background and foreground
* modal content.
*/

export default function useModalContent(modalContent) {
  return useMemo(() => {
    let backgroundContent = null;
    let foregroundContent = null;
    if (modalContent) {
      const {
        modalType,
        authorSlug,
        sectionSlug,
        figureNumber,
        paragraphNumber,
      } = modalContent;

      switch (modalType) {
        case AUTHOR_MODAL:
          foregroundContent = <AuthorModalForeground authorSlug={authorSlug} />;
          break;

        case FIGURE_MODAL:
          backgroundContent = (
            <FigureModalBackground
              sectionSlug={sectionSlug}
              figureNumber={figureNumber}
            />
          );

          foregroundContent = (
            <FigureModalForeground
              sectionSlug={sectionSlug}
              figureNumber={figureNumber}
            />
          );

          break;

        case CITATION_MODAL:
          foregroundContent = (
            <CitationModalForeground
              sectionSlug={sectionSlug}
              figureNumber={figureNumber}
              paragraphNumber={paragraphNumber}
            />
          );

          break;

        default:
      }
    }

    return [backgroundContent, foregroundContent];
  }, [modalContent]);
}
